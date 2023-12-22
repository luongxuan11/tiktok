import * as services from "../services";
import Joi from "joi";
import { internalError, badRequest } from "../middlewares/handleError";
import { password, newPassword, userName } from "../helpers/joi_schema";

// read controller
export const getUserCurrent = async (req, res) => {
     try {
          const { id } = req.user;
          const response = await services.getUserCurrent(id);
          return res.status(200).json(response);
     } catch (error) {
          return internalError(res, error.mess);
     }
};

// update controller
export const updateImageUser = async (req, res) => {
     try {
          const { id } = req.user;
          const fileData = req.file;
          if(!fileData) return res.status(400).json({
               err: 1,
               mess: "Bạn cần phải nhập hình ảnh!"
          })
          const response = await services.updateImageUser(id, fileData);
          return res.status(200).json(response);
     } catch (error) {
          return internalError(res);
     }
};
export const updateUser = async(req, res) => {
     try {
          const {id} = req.user
          const { error } = Joi.object({userName}).validate(req.body);
          if (error) return badRequest(error.details[0]?.message, res);

          const response = await services.updateUser(id, req.body);
          return res.status(200).json(response);
     } catch (error) {
          return internalError(res)
     }
}
// ============= end update ================== //

// change password
export const changePassword = async (req, res) => {
     try {
          const { id } = req.user;
          const { error } = Joi.object({ password, newPassword}).validate(req.body);
          if (error) return badRequest(error.details[0]?.message, res);

          const response = await services.changePassword(id, req.body);
          return res.status(200).json(response);
     } catch (error) {
          return internalError(res);
     }
};

// delete user
export const deleteUser = async(req, res) => {
     try {
          const {id}  = req.user
          const {password} = req.body
          if(!password) return res.status(404).json({
               err: 1,
               mess: "Yêu cầu nhập mật khẩu trước khi xóa tài khoản"
          })
          const response = await services.deleteUser(id, password);
          return res.status(200).json(response);
     } catch (error) {
          return internalError(res)
     }
}

// send otp
export const sendOtp = async (req, res) => {
     try {
          const { email } = req.body;
          // console.log(email)
          const { id } = req.user;
          if (!email)
               return res.status(404).json({
                    err: 1,
                    mess: "require email!",
               });
          const response = await services.sendOtp(id, email);
          return res.status(200).json(response);
     } catch (error) {
          return internalError(res, error.mess);
     }
};

// verify otp
export const verifyOtp = async (req, res) => {
     try {
          const { id } = req.user;
          const { otp } = req.body;
          if (!otp) {
               return res.status(403).json({
                    err: 1,
                    mess: "require otp",
               });
          }

          const response = await services.verifyOtp(id, otp);
          return res.status(200).json(response);
     } catch (error) {
          return res.status(501).json({
               err: 1,
               mess: error.mess,
          });
     }
};
