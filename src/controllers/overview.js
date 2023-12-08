import * as services from "../services";
import { internalError, badRequest } from "../middlewares/handleError";
import { drive, handlePipe } from "../helpers/uploadFileGoogleAfterFinish";
import deleteFilesOnDrive from "../helpers/deleteFileOnDrive";

export const createNewPost = async (req, res) => {
   const authDrive = drive();
   let fileDetails;
   try {
      // check invalid
      const { id } = req.user;
      const files = req.files;
      const body = req.body;

      //   const generateUserFolderId = req.generateUserFolderId;
      if (!id || !files) {
         return res.status(400).json({
            err: 1,
            mess: "Thiếu thông tin bắt buộc",
         });
      }
      fileDetails = await handlePipe(files);
      
      const response = await services.createNewPost(id, fileDetails, body, authDrive);
      return res.status(200).json(response);
   } catch (error) {
      await deleteFilesOnDrive(fileDetails, authDrive)
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
