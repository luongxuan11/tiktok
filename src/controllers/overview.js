import * as services from "../services";
import { internalError, badRequest } from "../middlewares/handleError";

export const createOverview = async (req, res) => {
     try {
          const { id } = req.user;
          const { privacy, file_name, file_id } = req.body;
          if (!privacy || !file_name || !file_id) {
               return {
                    err: 1,
                    mess: "thiếu thông tin bắt buộc!",
               };
          }
          const response = await services.createOverview(id, privacy, file_name, file_id, req.body);
          return res.status(200).json(response);
     } catch (error) {
          return internalError(res, error.mess);
     }
};

export const getPostOfUser = async (req, res) => {
     try {
          const { id } = req.user;
          const response = await services.getPostOfUser(id);
          return res.status(200).json(response);
     } catch (error) {
          return internalError(res, error.mess);
     }
};
