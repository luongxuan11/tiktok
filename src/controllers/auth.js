import * as services from "../services";
import { userName, email, password, repeatPassword, token, resetPassword } from "../helpers/joi_schema";
import { badRequest, internalError } from "../middlewares/handleError";
import joi from "joi";
const fs = require("fs");
const path = require("path");

// register controller
export const register = async (req, res) => {
   // console.log(req.body)
   try {
      const { error } = joi.object({ userName, email, password, repeatPassword }).validate(req.body);

      if (error) return badRequest(error.details[0]?.message, res);
      const response = await services.register(req.body);
      return res.status(200).json(response);
   } catch (error) {
      return internalError(res, error.message);
   }
};

// login controller
export const login = async (req, res) => {
   try {
      const { error } = joi.object({ email, password }).validate(req.body);
      if (error) return badRequest(error.details[0]?.message, res);
      const response = await services.login(req.body, res);
      return res.status(200).json(response);
   } catch (error) {
      console.log("auth: at row 30 =>>> here");
      return internalError(res, error.mess);
   }
};

// refresh accessToken
export const refreshAccessToken = async (req, res) => {
   try {
      const filePath = path.join(__dirname, "../../refreshToken.txt");
      const refreshToken = fs.readFileSync(filePath, "utf8", (err, data) => {
         if (err) {
            return res.status(400).json({
               err: 1,
               mess: err,
            });
         }
         return data;
      });
      if (!refreshToken)
         return res.status(401).json({
            err: 1,
            mess: "No refresh",
         });

      const response = await services.refreshAccessToken(refreshToken, res);
      return res.status(200).json(response);
   } catch (error) {
      return internalError(res, error.mess);
   }
};

// logout
export const logout = async (req, res) => {
   try {
      const filePath = path.join(__dirname, "../../refreshToken.txt");
      const refreshToken = fs.readFileSync(filePath, "utf8", (err, data) => {
         if (err) {
            return res.status(400).json({
               err: 1,
               mess: err,
            });
         }
         return data;
      });

      await services.logout(refreshToken);
      if (!refreshToken) {
         throw new Error("Không có refresh được khởi tạo");
      }

      fs.writeFile(filePath, "", (err) => {
         if (err) {
            return res.status(500).json({
               err: 1,
               mess: "Không thể xóa refresh token",
            });
         }
         return res.status(200).json({
            err: 0,
            mess: "Đăng xuất thành công",
         });
      });
   } catch (error) {
      return internalError(res, error.message);
   }
};

// forgot password
export const forgotPassword = async (req, res) => {
   try {
      const { email } = req.query;
      if (!email) {
         return res.status(400).json({
            err: 1,
            mess: "Missing email!",
         });
      }

      const response = await services.forgotPassword(email);
      return res.status(200).json(response);
   } catch (error) {
      return internalError(res, error.message);
   }
};

// reset password
export const checkResetPassword = async (req, res) => {
   try {
      const { error } = joi.object({ resetPassword, token }).validate(req.body);
      if (error) return badRequest(error.details[0]?.message, res);
      const response = await services.checkResetPassword(req.body?.resetPassword, req.body?.token);
      return res.status(200).json(response);
   } catch (error) {
      return internalError(res, error.message);
   }
};
