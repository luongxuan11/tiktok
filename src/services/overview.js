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

// get post of user
export const getPostLimit = (page) =>
   new Promise(async (resolve, reject) => {
      try {
         const limit = +process.env.LIMIT;
         let offset = !page || +page <= 1 ? 0 : +page - 1;

         const res = await db.Overview.findAndCountAll({
            nest: true,
            offset: offset * limit,
            limit: limit,
            order: [["updatedAt", "DESC"]],
            attributes: { exclude: ["createdAt", "video_file_id", "thumb_file_id"] },
            include: [
               {
                  model: db.Comment,
                  as: "comments",
                  attributes: { exclude: ["createdAt"] },
                  include: [
                     {
                        model: db.Feedback,
                        as: "link_feedback",
                        attributes: { exclude: ["createdAt"] },
                     },
                  ],
               },
               {
                  model: db.Status,
                  as: "status",
                  attributes: { exclude: ["createdAt"] },
               },
               {
                  model: db.Share,
                  as: "share",
                  attributes: { exclude: ["createdAt"] },
               },
               //db user
               {
                  model: db.User,
                  as: "user",
                  attributes: ["userName", "tiktok_id", "avatar"],
               },
            ],
         });
         resolve({
            err: res ? 0 : 1,
            mess: res ? "OK" : "got posts fail...",
            res: res,
         });
      } catch (error) {
         reject(error);
      }
   });

// get post of user
export const uploadFavorite = (userId, overviewId) =>
   new Promise(async (resolve, reject) => {
      try {
         const liked = await db.Status.findOne({
            where: {
               user_id: userId,
               overview_id: overviewId,
            },
         });

         if (liked) {
            await db.Status.destroy({
               where: {
                  user_id: userId,
                  overview_id: overviewId,
               },
            });
            resolve({
               err: 0,
               mess: "Status record deleted successfully!",
            });
         } else {
            const res = await db.Status.create({
               id: generateId(),
               user_id: userId,
               overview_id: overviewId,
            });
            resolve({
               err: res ? 0 : 1,
               mess: res ? "New status record created successfully!" : "có lỗi rồi",
            });
         }
      } catch (error) {
         reject(error);
      }
   });
