import * as services from "../services";
import { internalError, badRequest } from "../middlewares/handleError";
import Joi from "joi";
import { password, newPassword } from "../helpers/joi_schema";

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
export const updateUser = async (req, res) => {
     try {
          const { id } = req.user;
          const { ...payload } = req.body;
          if (!payload)
               return res.status(400).json({
                    err: 1,
                    mess: "missing input",
               });
          const response = await services.updateUser(id, payload);
          return res.status(200).json(response);
     } catch (error) {
          return internalError(res);
     }
};

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

// send otp
export const sendOtp = async (req, res) => {
     try {
          const { email } = req.body;
          // console.log(email)
          const { id } = req.user;
          if (!email)
               return res.status(401).json({
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
          // console.log(otp)

          const response = await services.verifyOtp(id, otp);
          return res.status(200).json(response);
     } catch (error) {
          return res.status(501).json({
               err: 1,
               mess: error.mess,
          });
     }
};
