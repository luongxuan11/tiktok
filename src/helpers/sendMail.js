import { number } from "joi";
import nodemailer from "nodemailer";

// Hàm gửi email
export const sendEmail = async (toEmail, option) => {
   try {
      // Tạo một bộ gửi email
      const transporter = nodemailer.createTransport({
         host: "smtp.gmail.com", // Thay thế bằng máy chủ email của bạn
         port: 587, // Cổng email
         secure: false, // false nếu sử dụng TLS
         auth: {
            user: process.env.EMAIL_NAME, // Thay thế bằng tài khoản email của bạn
            pass: process.env.EMAIL_APP_PASSWORD, // Thay thế bằng mật khẩu email của bạn
         },
      });

      if (typeof option === "number") {
         const otp = option.toString();
         console.log("check", typeof otp);
         const mailOptions = {
            from: "no-reply@tiktok.com", // Địa chỉ email của bạn
            to: toEmail, // Địa chỉ email của người dùng
            subject: `Nhóm tài khoản Tiktok`, // Tiêu đề email
            text: `Xin chào ${toEmail}
        
        Chúng tôi đã nhận yêu cầu mã dùng một lần để dùng cho tài khoản Tiktok của bạn.
  
        Mã dùng một lần của bạn là: ${option}
  
        Xin cám ơn
        Nhóm tài khoản Tiktok`, // Nội dung email
         };
         // Gửi email
         const info = await transporter.sendMail(mailOptions);
         return info.response;
      } else if (typeof option === "string") {
         const mailOptions = {
            from: "no-reply@tiktok.com", // Địa chỉ email người gửi
            to: toEmail,
            subject: `Nhóm tài khoản Tiktok`,
            html: option,
         };
         // Gửi email
         const info = await transporter.sendMail(mailOptions);
         return info.response;
      }
   } catch (error) {
      console.error("Error sending email:", error);
   }
};
