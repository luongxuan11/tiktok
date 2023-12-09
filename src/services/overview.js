import db from "../models";
import { v4 as generateId } from "uuid";
import { deleteImage, deleteVideo } from "../helpers/deleteFileOnCloudinary";

// create
export const createNewPost = (id, files, body) =>
   new Promise(async (resolve, reject) => {
      try {
         await db.Overview.create({
            id: generateId(),
            user_id: id,
            title: body?.title || "",
            privacy: body.privacy,
            comment_status: body.comment_status,
            video_file_name: files.video_file_name,
            video_file_id: files.video_file_id,
            thumb_file_name: files.thumb_file_name,
            thumb_file_id: files.thumb_file_id,
            tag: body?.tag || null,
            api_key: files.account_cloud,
         });

         resolve({
            err: 0,
            mess: "create success!",
         });
      } catch (error) {
         await deleteImage(files.thumb_file_id, files.account_cloud);
         await deleteVideo(files.video_file_id, files.account_cloud);
         reject(error);
      }
   });

// get post of user
export const getPostOfUser = (id) =>
   new Promise(async (resolve, reject) => {
      try {
         const res = await db.Overview.findAll({
            where: { user_id: id },
         });

         resolve({
            err: 0,
            mess: "get post of user success!",
            res,
         });
      } catch (error) {
         reject(error);
      }
   });
