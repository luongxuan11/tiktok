import db, { sequelize } from "../models";
import { v4 as generateId } from "uuid";
import { deleteImage, deleteVideo } from "../helpers/deleteFileOnCloudinary";
import { Op } from "sequelize";
import { login } from "./auth";

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

// get post limit
export const getPostLimit = (page) =>
   new Promise(async (resolve, reject) => {
      try {
         const limit = +process.env.LIMIT;
         let offset = !page || +page <= 1 ? 0 : +page - 1;

         const res = await db.Overview.findAll({
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
               //db user
               {
                  model: db.User,
                  as: "user",
                  attributes: ["userName", "tiktok_id", "avatar"],
               },
            ],
            where: {
               privacy: {
                  [Op.ne]: "Chỉ mình tôi",
               },
            },
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

// current post detail
export const getCurrentPost = (post_id, io) =>
   new Promise(async (resolve, reject) => {
      try {
         const post = await db.Overview.findOne({
            nest: true,
            attributes: { exclude: ["createdAt", "video_file_id", "thumb_file_id", "api_key"] },
            where: { id: post_id },
            include: [
               {
                  model: db.Comment,
                  as: "comments",
                  attributes: { exclude: ["createdAt"] },
                  include: [
                     {
                        // model feedback
                        model: db.Feedback,
                        as: "link_feedback",
                        attributes: { exclude: ["createdAt"] },
                        include: [
                           {
                              model: db.User,
                              as: "feedbackCurrent",
                              attributes: ["id", "userName", "avatar"],
                           },
                        ],
                     },
                     {
                        model: db.User,
                        as: "userCurrent",
                        attributes: ["id", "userName", "avatar"],
                     },
                  ],
               },
               {
                  model: db.Status,
                  as: "status",
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

         if (post) {
            io.on("connection", (socket) => {
               socket.on("join-room", (room) => {
                  socket.join(room);
               });
               socket.on("leave-room", (room) => {
                  socket.leave(room);
               });
            });
         }

         resolve({
            err: post ? 0 : 1,
            mess: post ? "success!" : "error!",
            data: post,
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
            const quantity = await db.Status.findAll({
               nest: true,
               attributes: ["id"],
               where: {
                  overview_id: overviewId,
               },
            });
            resolve({
               err: 0,
               mess: "Status record deleted successfully!",
               length: quantity.length,
            });
         } else {
            const res = await db.Status.create({
               id: generateId(),
               user_id: userId,
               overview_id: overviewId,
            });
            const quantity = await db.Status.findAll({
               nest: true,
               attributes: ["id"],
               where: {
                  overview_id: overviewId,
               },
            });
            resolve({
               err: res ? 0 : 1,
               mess: res ? "New status record created successfully!" : "có lỗi rồi",
               length: quantity.length,
            });
         }
      } catch (error) {
         reject(error);
      }
   });

// export const getPostLimitDetail = (page, text, id) =>
//    new Promise(async (resolve, reject) => {
//       try {
//          const limit = +process.env.LIMIT_DETAIL;
//          let offset = !page || +page <= 1 ? 0 : +page - 1;

//          const res = await db.Overview.findAndCountAll({
//             nest: true,
//             offset: offset * limit,
//             limit: limit,
//             order: [["updatedAt", "DESC"]],
//             attributes: { exclude: ["createdAt", "video_file_id", "thumb_file_id"] },
//             include: [
//                {
//                   model: db.Comment,
//                   as: "comments",
//                   attributes: { exclude: ["createdAt"] },
//                   include: [
//                      {
//                         model: db.Feedback,
//                         as: "link_feedback",
//                         attributes: { exclude: ["createdAt"] },
//                      },
//                   ],
//                },
//                {
//                   model: db.Status,
//                   as: "status",
//                   attributes: { exclude: ["createdAt"] },
//                },
//                {
//                   model: db.Share,
//                   as: "share",
//                   attributes: { exclude: ["createdAt"] },
//                },
//                //db user
//                {
//                   model: db.User,
//                   as: "user",
//                   attributes: ["userName", "tiktok_id", "avatar"],
//                },
//             ],
//          });
//          resolve({
//             err: res ? 0 : 1,
//             mess: res ? "OK" : "got posts fail...",
//             res: res,
//          });
//       } catch (error) {
//          reject(error);
//       }
//    });

// get video of user
export const getVideoOfUser = (userId, control) =>
   new Promise(async (resolve, reject) => {
      try {
         const res = !control
            ? await db.Overview.findAll({
                 attributes: ["video_file_name", "id", "user_id", "title"],
                 where: {
                    user_id: userId,
                    privacy: {
                       [Op.ne]: "Chỉ mình tôi",
                    },
                 },
              })
            : await db.Overview.findAll({
                 attributes: [
                    "video_file_name",
                    "id",
                    "user_id",
                    "title",
                    "thumb_file_name",
                    "privacy",
                    "createdAt",
                    "api_key",
                    "thumb_file_id",
                    "video_file_id",
                 ],
                 where: {
                    user_id: userId,
                 },
                 include: [
                    {
                       model: db.Status,
                       as: "status",
                       attributes: ["id"],
                    },
                    {
                       model: db.Comment,
                       as: "comments",
                       attributes: ["id"],
                    },
                 ],
              });
         resolve({
            err: res && res.length > 0 ? 0 : 1,
            mess: res && res.length > 0 ? "OK" : "got posts fail...",
            res: res,
         });
      } catch (error) {
         reject(error);
      }
   });

export const getPostsExplore = (page) =>
   new Promise(async (resolve, reject) => {
      try {
         const limit = +process.env.LIMIT_POST_EXPLORE;
         let offset = !page || +page <= 1 ? 0 : +page - 1;
         const res = await db.Overview.findAll({
            limit: limit,
            offset: offset * limit,
            order: [["updatedAt", "DESC"]],
            attributes: ["video_file_name", "id", "user_id", "title", "updatedAt"],
            include: [
               //db user
               {
                  model: db.User,
                  as: "user",
                  attributes: ["userName", "avatar"],
               },
               {
                  model: db.Status,
                  as: "status",
                  attributes: ["user_id"],
               },
            ],
            where: {
               privacy: {
                  [Op.ne]: "Chỉ mình tôi",
               },
            },
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

export const getPostsFollowing = (page, idFollower) =>
   new Promise(async (resolve, reject) => {
      try {
         const limit = +process.env.LIMIT_DETAIL;
         let offset = !page || +page <= 1 ? 0 : +page - 1;

         const res = await db.Overview.findAll({
            nest: true,
            offset: offset * limit,
            limit: limit,
            order: [["updatedAt", "DESC"]],

            where: {
               user_id: idFollower,
               privacy: {
                  [Op.ne]: "Chỉ mình tôi",
               },
            },
            include: [
               //db user
               {
                  model: db.User,
                  as: "user",
                  attributes: ["userName", "avatar", "tiktok_id"],
               },
               {
                  model: db.Status,
                  as: "status",
                  attributes: { exclude: ["createdAt"] },
               },
               {
                  model: db.Comment,
                  as: "comments",
                  attributes: { exclude: ["createdAt"] },
               },
            ],
         });
         resolve({
            err: res ? 0 : 1,
            mess: res ? "success!" : "opps! error",
            res: res ? res : null,
         });
      } catch (error) {
         reject(error);
      }
   });

export const updatePost = (query) =>
   new Promise(async (resolve, reject) => {
      try {
         const res = await db.Overview.update(
            {
               privacy: query.privacy,
            },
            {
               where: { id: query.id },
            },
         );

         resolve({
            err: res[0] ? 0 : 1,
            mess: res[0] ? "update Post successfully!" : "Ops! There're error!",
         });
      } catch (error) {
         reject(error);
      }
   });

export const deletePost = async (id, comment_ids, status_ids) => {
   try {
      if (comment_ids) {
         await Promise.all([
            db.Comment.destroy({ where: { id: comment_ids } }),
            db.Feedback.destroy({ where: { comment_id: comment_ids } }),
         ]);
      }
      if (status_ids) {
         await db.Status.destroy({ where: { id: status_ids } });
      }

      const overview = await db.Overview.destroy({ where: { id } });

      return {
         err: overview ? 0 : 1,
         mess: overview ? "Deleted post!" : "Error!",
      };
   } catch (error) {
      throw error;
   }
};

export const getVideoLiked = (overview_id) =>
   new Promise(async (resolve, reject) => {
      try {
         const res = await db.Overview.findAll({
            where: { id: overview_id },
            attributes: ["video_file_name", "id", "user_id", "title"],
         });
         resolve({
            err: res ? 0 : 1,
            mess: res ? "success!" : "opps! error",
            res: res ? res : null,
         });
      } catch (error) {
         reject(error);
      }
   });
