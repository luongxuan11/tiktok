import * as services from "../services";
import { internalError, badRequest } from "../middlewares/handleError";
import { drive, handlePipe } from "../helpers/uploadFileGoogleAfterFinish";

export const createNewPost = async (req, res) => {
     try {
        // check invalid
        const { id } = req.user;
        const file = req.file; 
  
        const generateUserFolderId = req.generateUserFolderId;
        if (!id || !file) {
           return res.status(400).json({
              err: 1,
              mess: "Thiếu thông tin bắt buộc",
           });
        }
        const test = await handlePipe(file);
        console.log(test)
  
        // const response = await services.createNewPost(id, test.fileUrl, test.fileId, drive(), file.originalname, generateUserFolderId);
        // return res.status(200).json(response);
     } catch (error) {
        internalError(res, error.message);
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
