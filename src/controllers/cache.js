import { internalError } from "../middlewares/handleError";
import * as services from "../services";
import { drive, handlePipe } from "../helpers/uploadFileGoogleAfterFinish";

export const createNewPost = async (req, res) => {
   try {
      // check invalid
      const { id } = req.user;
      const file = req.file;
      if (!id || !file) {
         return res.status(400).json({
            err: 1,
            mess: "Thiếu thông tin bắt buộc",
         });
      }
      const test = await handlePipe(file);
      console.log("test", test);

      const response = await services.createNewPost(id, test.fileUrl, test.fileId, drive(), file.originalname);
      return res.status(200).json(response);
   } catch (error) {
      internalError(res, error.message);
   }
};

// get cache
export const getCache = async (req, res) => {
   try {
      const { id } = req.user;

      const response = await services.getCache(id);
      return res.status(200).json(response);
   } catch (error) {
      internalError(res, error.message);
   }
};

// delete file and google
export const deleteFile = async (req, res) => {
   try {
      const { id } = req.user;
      const { fileId } = req.body;

      const response = await services.deleteFile(id, fileId, drive());
      return res.status(200).json(response);
   } catch (error) {
      internalError(res, error.message);
   }
};

// delete db not google
export const deleteCache = async (req, res) => {
   try {
      const { id } = req.user;
      // console.log(id)
      const response = await services.deleteCache(id);
      return res.status(200).json(response);
   } catch (error) {
      internalError(res, error.message);
   }
};
