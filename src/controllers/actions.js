import * as services from "../services";
import { internalError } from "../middlewares/handleError";

// read controller
export const search = async (req, res) => {
   try {
      const { text } = req.query;
      const response = await services.search(text);
      return res.status(200).json(response);
   } catch (error) {
      console.log(error);
      return internalError(res, error.mess);
   }
};

export const follower = async (req, res) => {
   try {
      const { follower } = req.query;
      const { id } = req.user;

      if (!id || !follower)
         return res.status(404).json({
            err: 1,
            mess: "missing value!",
         });
      const response = await services.follow(id, follower);
      return res.status(200).json(response);
   } catch (error) {
      return internalError(res, error.mess);
   }
};

export const getFollower = async (req, res) => {
   try {
      const query = req.query;
      if (!query || !query.id_follow)
         return res.status(404).json({
            err: 1,
            mess: "missing input",
         });
      const response = await services.getFollower(query);
      return res.status(200).json(response);
   } catch (error) {
      console.log(error);
      return internalError(res, error.mess);
   }
};

// action comment
export const uploadComment = async (req, res) => {
   try {
      const { overview_id, comment } = req.body;
      const { id } = req.user;
      const io = req.io;
      if (!overview_id || !comment)
         return res.status(404).json({
            err: 1,
            mess: "missing input",
         });
      const response = await services.uploadComment(overview_id, comment, id, io);
      return res.status(200).json(response);
   } catch (error) {
      console.log(error);
      return internalError(res, error.mess);
   }
};
export const uploadFeedback = async (req, res) => {
   try {
      const { comment_id, feedback, overview_id } = req.body;
      const { id } = req.user;
      const io = req.io;
      if (!comment_id || !feedback)
         return res.status(404).json({
            err: 1,
            mess: "missing input",
         });
      const response = await services.uploadFeedback(overview_id ,comment_id, feedback, id, io);
      return res.status(200).json(response);
   } catch (error) {
      console.log(error);
      return internalError(res, error.mess);
   }
};

// action delete comment
export const deleteComment = async (req, res) => {
   try {
      const { comment_id } = req.query;
      const io = req.io;
      if (!comment_id) {
         return res.status(404).json({
            err: 1,
            mess: "missing input",
         });
      }
      const response = await services.deleteComment(comment_id, io);
      return res.status(200).json(response);
   } catch (error) {
      console.log(error);
      return internalError(res, error.mess);
   }
};
