import db from "../models";
import { v4 as generateId } from "uuid";
import { deleteFolderThumbnail } from "../helpers/deleteFolderThumbnail";

// create
export const createNewPost = (id, fileUrl, fileId, drive, original_name) =>
   new Promise(async (resolve, reject) => {
      try {
         await db.Cache.create({
            id: generateId(),
            user_id: id,
            file_name: fileUrl.replace("=download", ""),
            file_id: fileId,
            original_name,
         });

         resolve({
            err: 0,
            mess: "create video success!",
         });
      } catch (error) {
         if (fileId) {
            try {
               await drive.files.delete({
                  fileId,
               });
            } catch (driveError) {
               console.error("Lỗi xóa tệp trên Google Drive:", driveError);
            }
         }
         reject(error);
      }
   });

// get cache
export const getCache = (id) =>
   new Promise(async (resolve, reject) => {
      try {
         const res = await db.Cache.findOne({
            where: { user_id: id },
            attributes: {
               exclude: ["createdAt", "updatedAt"],
            },
         });
         resolve({
            err: res ? 0 : 1,
            mess: res ? "got" : "cache not found",
            cache: res,
         });
      } catch (error) {
         reject(error);
      }
   });

//   delete file and google drive
export const deleteFile = (id, fileId, drive) =>
   new Promise(async (resolve, reject) => {
      try {
         // deleteFolder
         await deleteFolderThumbnail(id);

         //   delete file google
         if (fileId) {
            try {
               await drive.files.delete({
                  fileId,
               });
            } catch (driveError) {
               return resolve({
                  err: 1,
                  mess: driveError.errors || "not delete file google driver =>> invalid!",
               });
            }
         }
         //   delete database
         const res = await db.Cache.destroy({
            where: { user_id: id },
         });
         resolve({
            err: res ? 0 : 1,
            mess: res ? "success!" : "Opss! not found cache into db.",
         });
      } catch (error) {
         reject(error);
      }
   });

//   delete db cache not google file
export const deleteCache = (id) =>
   new Promise(async (resolve, reject) => {
      try {
         // deleteFolder
         await deleteFolderThumbnail(id);

         const res = await db.Cache.destroy({
            where: { user_id: id },
         });

         resolve({
            err: res ? 0 : 1,
            mess: res ? "success!" : "Opss! not found cache into db.",
         });
      } catch (error) {
         reject(error);
      }
   });
