import db from "../models";
import bcrypt from "bcrypt";
import { create_access_token, create_refresh_token } from "../middlewares/jwt";
import jwt from "jsonwebtoken";
import generateOTP from "../helpers/generateOTP";
import { v4 } from "uuid";
import resetToken from "../helpers/resetToken";
import { sendEmail } from "../helpers/sendMail";
import { hashPassword } from "../helpers/hashPassword";
// import { date } from "joi";
// const crypto = require("crypto");

// register
export const register = ({ userName, email, password }) =>
   new Promise(async (resolve, reject) => {
      const id = v4();
      try {
         // create otp
         const otp = generateOTP();

         // create info user
         const res = await db.User.findOrCreate({
            where: { email },
            defaults: {
               id: id,
               tiktok_id: `@user${id}`,
               userName,
               email,
               password: hashPassword(password),
               otp,
            },
         });
         resolve({
            err: res[1] ? 0 : 1,
            mess: res[1] ? "register is successfully" : "email is used",
         });
      } catch (error) {
         //   console.log("chekc>>>", email);
         reject(error);
      }
   });

// login
export const login = ({ email, password }, response) =>
   new Promise(async (resolve, reject) => {
      try {
         const res = await db.User.findOne({
            where: { email },
            raw: true,
         });

         // console.log(res)
         const isChecked = res && bcrypt.compareSync(password, res.password);

         const accessToken = isChecked ? create_access_token(res) : null;
         const refreshToken = isChecked ? create_refresh_token(res.id) : null;
         // console.log(refreshToken)

         // save into database
         if (refreshToken) {
            await db.User.update({ refresh_token: refreshToken }, { where: { id: res.id } });

            // save refreshToken into cookie
            response.cookie("refresh_token", refreshToken, {
               httpOnly: true,
               maxAge: 15 * 24 * 60 * 60 * 1000,
            });
         }

         resolve({
            err: accessToken ? 0 : 1,
            mess: accessToken ? "login is successfully" : res ? "password is wrong" : "email is not registered",
            access_token: accessToken ? `bearer ${accessToken}` : accessToken,
         });

         resolve({
            err: 0,
            mes: "register services",
         });
      } catch (error) {
         reject(error);
      }
   });

// api refresh token
export const refreshAccessToken = ( cookie, res) => // lưu ý: khi bắt được lỗi 401 bên getUser thì gọi api này
   new Promise(async (resolve, reject) => {
      try {
         // Xác minh refresh_token bằng cách sử dụng jwt.verify
         jwt.verify(cookie.refresh_token, process.env.JWT_SECRET_REFRESH, async (err, decode) => {
            if (err) {
               return res.status(401).json({
                  err: 1,
                  mess: "Refresh token không hợp lệ hoặc đã hết hạn",
               });
            }

            // Kiểm tra xem ID đã giải mã khớp với ID của người dùng trong cơ sở dữ liệu không
            const user = await db.User.findOne({
               where: {
                  id: decode.id,
                  refresh_token: cookie.refresh_token,
               },
               raw: true,
            });
            // console.log(user)

            if (!user) {
               return res.status(404).json({
                  err: 1,
                  mess: "Refresh token không khớp với bất kỳ người dùng nào",
               });
            }

            // Tạo một mã truy cập mới
            const accessToken = create_access_token(user); //khi bắt được lỗi 401 bên getUser thì gọi api này

            resolve({
               err: 0,
               mess: "Cập nhật mã truy cập thành công",
               access_token: `bearer ${accessToken}`,
            });
         });
      } catch (error) {
         reject(error);
      }
   });

// logout
export const logout = (cookie) =>
   new Promise(async (resolve, reject) => {
      try {
         // Tìm người dùng có refresh_token và xóa nó
         const user = await db.User.findOne({
            where: {
               refresh_token: cookie.refresh_token,
            },
         });

         if (user) {
            await db.User.update(
               { refresh_token: null },
               {
                  where: { refresh_token: cookie.refresh_token },
               },
            );
         } else {
            return resolve({
               err: 1,
               mess: "Không tìm thấy người dùng có refresh token",
            });
         }

         resolve({
            err: 0,
            mess: "Đăng xuất thành công",
         });
      } catch (error) {
         reject(error);
      }
   });

// forgot password
/*
  1. người dùng gửi mail lên
  2. server check xem email có hợp lệ không => hợp lệ thì gửi mail + kèm link ()
  3. báo cho client check mail => click vào link
*/
export const forgotPassword = (email) =>
   new Promise(async (resolve, reject) => {
      try {
         const { passwordResetToken, passwordResetExpires } = resetToken();

         const user = await db.User.findOne({
            where: { email },
            raw: true,
         });
         if (!user) {
            return resolve({
               err: 1,
               mess: "Email chưa được đănhg kí hoặc bạn đã nhập sai... vui lòng thử lại.",
            });
         } else {
            await db.User.update(
               {
                  passwordResetToken,
                  passwordResetExpires,
               },
               {
                  where: { email },
               },
            );
         }

         const html = `
    Vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn.
    Lưu ý: Link này sẽ hết hạn sau 15 phút kể từ bây giờ.
    <a href=${process.env.SERVER_URL}/api/v1/auth/reset-password/${passwordResetToken}>click here</a>
    `;
         const res = sendEmail(email, html);

         resolve({
            err: res ? 0 : 1,
            mess: res ? "Chúng tôi đã gửi mail cho bạn vui lòng kiểm tra gmail." : "Opps! error",
         });
      } catch (error) {
         reject(error);
      }
   });

/*
  * reset password: 
    1. find token into db
    2. check expire token
    3. check expire token
    4. finish update password =>> remove value
*/

export const checkResetPassword = (password, token) =>
   new Promise(async (resolve, reject) => {
      try {
         const user = await db.User.findOne({
            where: {
               passwordResetToken: token,
            },
            attributes: ["passwordResetExpires"],
            raw: true,
         });
         if (!user)
            return resolve({
               err: 1,
               mess: "Opps!, Token resetPassword invalid.",
            });

         // check expire token
         const currentTime = Date.now();
         console.log(currentTime);
         console.log(user);
         if (user.passwordResetExpires < currentTime) {
            return resolve({
               err: 1,
               mess: "Token has expired!",
            });
         }

         // finish update password =>> remove value
         const res = await db.User.update(
            {
               password: hashPassword(password),
               passwordResetToken: null,
               passwordResetExpires: null,
            },
            {
               where: { passwordResetToken: token },
            },
         );

         resolve({
            err: res ? 0 : 1,
            mess: res ? "Updated password " : "Update password fail!",
         });
      } catch (error) {
         reject(error);
      }
   });
