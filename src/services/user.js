import db from "../models";
import generateOTP from "../helpers/generateOTP";
import { sendEmail } from "../helpers/sendMail";

// READ
export const getUserCurrent = (userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const res = await db.User.findOne({
        where: { id: userId },
        attributes: {
          exclude: ["password", "role_code", "refresh_token", "otp"],
        },
        include: [
          {
            model: db.Role,
            as: "roleData",
            attributes: ["id", "code", "value"],
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
export const updateUser = (userId, payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const res = await db.User.update(payload, {
        where: { id: userId },
      });
      resolve({
        err: res[0] > 0 ? 0 : 1,
        mess: res[0] > 0 ? "updated user successfully!" : "fail to update",
        userData: res,
      });
    } catch (error) {
      reject(error);
    }
  });

// delete

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
      await sendEmail(email, +newOtp);

      resolve({
        err: 0,
        mess: "OTP resent successfully",
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
          { where: { id: userId } }
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
