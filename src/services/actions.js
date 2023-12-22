import { Op } from "sequelize";
import db from "../models";
import { v4 as generateId } from "uuid";

// READ
export const search = (text) =>
   new Promise(async (resolve, reject) => {
      try {
         // Sử dụng Sequelize để tìm kiếm người dùng với userName bắt đầu bằng chữ cái nhập vào
         const users = await db.User.findAll({
            attributes: ["id", "tiktok_id", "userName", "avatar"], // Chỉ lấy các trường userName và avatar
            where: {
               userName: {
                  [Op.like]: `${text}%`, // Sử dụng Op.Like để tìm kiếm không phân biệt chữ hoa, chữ thường
               },
            },
         });

         const posts = await db.Overview.findAll({
            attributes: ["id", "title"],
            where: {
               title: {
                  [Op.like]: `${text}%`,
               },
            },
            include: [
               {
                  model: db.User,
                  as: "user",
                  attributes: ['tiktok_id'],
               },
            ]
         });

         resolve({
            err: users && posts ? 0 : 1,
            users: users,
            posts: posts,
         });
      } catch (error) {
         reject(error);
      }
   });

export const follow = (id, follower) =>
   new Promise(async (resolve, reject) => {
      try {
         const user = await db.Follow.findOne({
            where: {
               user_id: id,
               user_follow: follower,
            },
         });
         if (user) {
            await db.Follow.destroy({
               where: {
                  user_id: id,
                  user_follow: follower,
               },
            });
            resolve({
               err: 0,
               mess: "follower record deleted successfully!",
               state: "Follow"
            });
         } else {
            const res = await db.Follow.create({
               id: generateId(),
               user_id: id,
               user_follow: follower,
            });
            resolve({
               err: res ? 0 : 1,
               mess: res ? "New follow record created successfully!" : "có lỗi rồi",
               state: "Đang follow"
            });
         }
      } catch (error) {
         reject(error);
      }
   });


   export const getFollower = (query) =>
   new Promise(async (resolve, reject) => {
      try {
         const res = await db.User.findAll({
            attributes: ["id", "userName", "tiktok_id", "avatar"],
            where: {
               id: query.id_follow
            }
         })
         resolve({
            err: res ? 0 : 1,
            mess: res ? "get follower successfully!" : "Opss! error",
            data: res
         })
      } catch (error) {
         reject(error);
      }
   });