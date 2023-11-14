import { internalError } from "../middlewares/handleError";
import * as services from "../services";
import { drive, handlePipe } from "../helpers/uploadFileGoogleAfterFinish";

export const createNewPost = async (req, res) => {
   try {
      // check invalid
      const { id } = req.user;
      const file = req.file;
      const generateUserFolderId = req.generateUserFolderId
      if (!id || !file) {
         return res.status(400).json({
            err: 1,
            mess: "Thiếu thông tin bắt buộc",
         });
      }
      const test = await handlePipe(file);

      const response = await services.createNewPost(id, test.fileUrl, test.fileId, drive(), file.originalname, generateUserFolderId);
      return res.status(200).json(response);
   } catch (error) {
      internalError(res, error.message);
   }
};

// get cache
export const getCache = async (req, res) => {
   try {
      const {videoId} = req.query

      const response = await services.getCache(videoId);
      return res.status(200).json(response);
   } catch (error) {
      internalError(res, error.message);
   }
};

// delete file and google
export const deleteFile = async (req, res) => {
   try {
      const { id } = req.user;
      const { fileId, generateUserFolderId } = req.body;
      if(!generateUserFolderId) return res.status(400).json({
         err: 1,
         mess: "Thiếu thông tin bắt buộc"
      })

      const response = await services.deleteFile(id, fileId, drive(), generateUserFolderId);
      return res.status(200).json(response);
   } catch (error) {
      internalError(res, error.message);
   }
};

// delete db not google
export const deleteCache = async (req, res) => {
   try {
      const { id } = req.user;
      const {deleted} = req.query
      // return console.log(deleted)
      const response = await services.deleteCache(id, deleted);
      return res.status(200).json(response);
   } catch (error) {
      internalError(res, error.message);
   }
};
