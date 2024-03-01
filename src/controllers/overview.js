import * as services from "../services";
import { internalError, badRequest } from "../middlewares/handleError";
import { deleteImage, deleteVideo } from "../helpers/deleteFileOnCloudinary";
import { query } from "express";

export const createNewPost = async (req, res) => {
   let files;
   try {
      // check invalid
      files = req.filesDetail;
      const { id } = req.user;
      const body = req.body;

      const response = await services.createNewPost(id, files, body);
      return res.status(200).json(response);
   } catch (error) {
      await deleteImage(files.thumb_file_id, files.account_cloud);
      await deleteVideo(files.video_file_id, files.account_cloud);
      internalError(res, error.message);
   }
};

export const getPostLimit = async (req, res) => {
   try {
      const { page } = req.query;
      const response = await services.getPostLimit(page);
      return res.status(200).json(response);
   } catch (error) {
      internalError(res, error.message);
   }
};

// export const getPostLimitDetail = async (req, res) => {
//    try {
//       const { page, text, id } = req.query;
//       const response = await services.getPostLimitDetail(page, text, id);
//       return res.status(200).json(response);
//    } catch (error) {
//       internalError(res, error.message);
//    }
// };

export const getCurrentPost = async (req, res) => {
   try {
      const { post_id } = req.query;
      const io = req.io;
      if (!post_id)
         return res.status(404).json({
            err: 1,
            mess: "Thiếu thông tin bắt buộc",
         });
      const response = await services.getCurrentPost(post_id, io);
      return res.status(200).json(response);
   } catch (error) {
      internalError(res, error.message);
   }
};

export const updatePost = async (req, res) => {
   try {
      const response = await services.updatePost(req.body);
      return res.status(200).json(response);
   } catch (error) {
      internalError(res, error.message);
   }
};

export const deletePost = async (req, res) => {
   try {
      const { api_key, video_file_id, thumb_file_id, id, comment_id, status_id } = req.query;
      const deleteVideoInCloud = await deleteVideo(video_file_id, api_key);
      const deleteThumbInCloud = await deleteImage(thumb_file_id, api_key);
      if (!deleteVideoInCloud && !deleteThumbInCloud) {
         return res.status(400).json({
            err: 1,
            mess: "Quá trình xóa bài viết gặp lỗi",
         });
      }
      const response = await services.deletePost(id, comment_id, status_id);
      return res.status(200).json(response);
   } catch (error) {
      internalError(res, error.message);
   }
};

export const uploadFavorite = async (req, res) => {
   try {
      const { userId, overviewId } = req.body;
      if (!userId && !overviewId)
         return res.status(404).json({
            err: 1,
            mess: "Thiếu thông tin bắt buộc",
         });
      const response = await services.uploadFavorite(userId, overviewId);
      return res.status(200).json(response);
   } catch (error) {
      return internalError(res, error.mess);
   }
};

export const getVideoOfUser = async (req, res) => {
   try {
      const { userId, control } = req.query;
      if (!userId) {
         return res.status(404).json({
            err: 1,
            mess: "missing input!",
         });
      }
      const response = await services.getVideoOfUser(userId, control);
      return res.status(200).json(response);
   } catch (error) {
      return internalError(res, error.mess);
   }
};

export const getPostsExplore = async (req, res) => {
   try {
      const { page } = req.query;
      const response = await services.getPostsExplore(page);
      return res.status(200).json(response);
   } catch (error) {
      return internalError(res, error.mess);
   }
};

export const getPostsFollowing = async (req, res) => {
   try {
      const { page, idFollower } = req.query;
      if (!idFollower)
         return res.status(404).json({
            err: 1,
            mess: "Missing input!",
         });
      const response = await services.getPostsFollowing(page, idFollower);
      return res.status(200).json(response);
   } catch (error) {
      console.log("here");
      return internalError(res, error.mess);
   }
};

export const getVideoLiked = async (req, res) => {
   try {
      const { overviewId } = req.query;
      if (!overviewId)
         return res.status(404).json({
            err: 1,
            mess: "Chưa có video khởi tạo.",
         });
      const response = await services.getVideoLiked(overviewId);
      return res.status(200).json(response);
   } catch (error) {
      return internalError(res, error.mess);
   }
};
