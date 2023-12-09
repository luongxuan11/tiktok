import * as services from "../services";
import { internalError, badRequest } from "../middlewares/handleError";
import { deleteImage, deleteVideo } from "../helpers/deleteFileOnCloudinary";

export const createNewPost = async (req, res) => {
   let files;
   try {
      // check invalid
      files = req.filesDetail;
      const {id} = req.user;
      const body = req.body;
      
      const response = await services.createNewPost(id,files, body);
      return res.status(200).json(response);
   } catch (error) {
      await deleteImage(files.thumb_file_id, files.account_cloud);
      await deleteVideo(files.video_file_id, files.account_cloud);
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
