import db from "../models";
const cloudinary = require("cloudinary").v2;
import generateOTP from "../helpers/generateOTP";
import { sendEmail } from "../helpers/sendMail";
import bcrypt from "bcrypt";
import { hashPassword } from "../helpers/hashPassword";

// READ
export const getUserCurrent = (userId) =>
   new Promise(async (resolve, reject) => {
      try {
         const res = await db.User.findOne({
            where: { id: userId },
            attributes: {
               exclude: ["password", "refresh_token", "otp", "passwordResetExpires", "passwordResetToken", "role_code"],
            },
            include: [
               {
                  model: db.Role,
                  as: "roleData",
                  attributes: ["id", "code", "value"],
               },
               {
                  model: db.Follow,
                  as: "follow",
                  attributes: {
                     exclude: ['createdAt', 'updatedAt']
                  }
               },
            ],
         });
         // console.log("checking data...", res)
         resolve({
            err: res ? 0 : 1,
            mess: res ? "got" : "user not found",
            userData: res,
         });
      } catch (error) {
         reject(error);
      }
   });

// update
export const updateImageUser = (userId, fileData) =>
   new Promise(async (resolve, reject) => {
      try {
         // Delete when there are avatar in the database
         const deleteAvatarOld = await db.User.findOne({
            where: {id: userId},
            attributes: ['fileName']
         })
         if(deleteAvatarOld.fileName && fileData){
            try {
               await cloudinary.uploader.destroy(deleteAvatarOld.fileName)
            } catch (error) {
               reject(error)
            }
         }

         // update new avatar
         const res = await db.User.update({
            avatar: fileData.path,
            fileName: fileData.filename
         }, {
            where: { id: userId },
         });
         resolve({
            err: res ? 0 : 1,
            mess: res ? "updated user successfully!" : "fail to update",
            userData: res,
         });
      } catch (error) {
         if(fileData){
            await cloudinary.uploader.destroy(fileData.fileName)
         }
         reject(error);
      }
   });

export const updateUser = (id, body) => new Promise(async(resolve, reject) => {
   try {
      const user = await db.User.update(body, {
         where: {id}
      })

      resolve({
         err: user ? 0 : 1,
         mess: user ? "Bạn đã đổi tên thành công" : "Opps! Error"
      })
   } catch (error) {
      reject(error)
   }
})
// =============== end update =============== //

/*
  * change password
  1. 
*/
export const changePassword = (id, body) =>
   new Promise(async (resolve, reject) => {
      const currentPassword = body.password;
      const newPassword = body.newPassword;
      try {
        // check invalid user
         const res = await db.User.findOne({
            where: { id },
            raw: true,
         });
         if (!res)
            return resolve({
               err: 1,
               mess: `Không tìm thấy người dùng có mã ${id} trong hệ thống`,
            });

        // check password
         const isChecked = await bcrypt.compareSync(currentPassword, res.password);
         if (!isChecked)
            return resolve({
               err: 1,
               mess: "Mật khẩu vừa nhập không đúng",
            });

        // save password into db
        const updatePassword = await db.User.update({
          password: hashPassword(newPassword)
        }, {
          where: {id}
        })


        resolve({
          err: updatePassword ? 0 : 1,
          mess: updatePassword ? "Cập nhật mật khẩu thành công!" : "Opps! lỗi rồi"
        })
      } catch (error) {
         reject(error);
      }
   });

// delete user
export const deleteUser = (id, password) => new Promise(async(resolve, reject) => {
   try {
      const user = await db.User.findOne({
         where: {id},
         attributes: ['fileName', 'password']
      })

      // check pass
      const isChecked = await bcrypt.compareSync(password, user.password);
      if(!isChecked) return resolve({
         err: 1,
         mess: "Mật khẩu không khớp vui lòng thử lại"
      })

      // delete file
      const deleteFile = await cloudinary.uploader.destroy(user.fileName)
      if(!deleteFile) return resolve({
         err: 1,
         mess: "Opps! Có vấn đề về đường truyền"
      })
      const res = await db.User.destroy({
         where: {id}
      })

      resolve({
         err: (deleteFile && res) ? 0 : 1,
         mess: (deleteFile && res) ? "Xóa tài khoản thành công" : "Error! Thất bại",
      })
   } catch (error) {
      reject(error)
   }   
})



// send otp
export const sendOtp = (id, email) =>
   new Promise(async (resolve, reject) => {
      try {
         const user = await db.User.findOne({
            where: {
               id,
               email,
            },
         });
         if (!user) {
            return resolve({
               err: 1,
               mess: "user not found",
            });
         }

         // create a new otp
         const newOtp = generateOTP();
         // console.log(typeof(newOtp))

         // update otp into db
         user.otp = newOtp;
         await user.save();

         // Gửi mã OTP mới đến địa chỉ email của người dùng
         const resMail = await sendEmail(email, +newOtp);

         resolve({
            err: resMail ? 0 : 1,
            mess: resMail ? `Chúng tôi đã gửi Mail cho bạn vui lòng kiểm tra tin nhắn. ${resMail}` : "Có lỗi xảy ra khi gửi mail.",
         });
      } catch (error) {
         reject(error);
      }
   });

// verify otp
export const verifyOtp = (userId, otp) =>
   new Promise(async (resolve, reject) => {
      try {
         const otpVerify = await db.User.findOne({
            raw: true,
            where: { id: userId },
         });
         if (otpVerify.otp === +otp) {
            await db.User.update(
               {
                  otp: null,
                  verifyOTP: true,
               },
               { where: { id: userId } },
            );

            resolve({
               err: 0,
               mess: "Xác thực tài khoản thành công!",
            });
         } else {
            resolve({
               err: 1,
               mess: "opt không hợp lệ, vui lòng thử lại!",
            });
         }
      } catch (error) {
         reject(error);
      }
   });
