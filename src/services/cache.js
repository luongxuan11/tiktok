// import db from "../models";
// import { v4 as generateId } from "uuid";
// import { deleteFolderThumbnail } from "../helpers/deleteFolderThumbnail";

// // create
// export const createNewPost = (id, fileUrl, fileId, drive, original_name, generateUserFolderId) =>
//    new Promise(async (resolve, reject) => {
//       try {
//          await db.Cache.create({
//             id: generateId(),
//             user_id: id,
//             file_name: fileUrl.replace("=download", ""),
//             file_id: fileId,
//             original_name,
//             generateUserFolderId,
//          });

//          resolve({
//             err: 0,
//             mess: "create video success!",
//             data: fileId
//          });
//       } catch (error) {
//          if (fileId) {
//             try {
//                await drive.files.delete({
//                   fileId,
//                });
//             } catch (driveError) {
//                console.error("Lỗi xóa tệp trên Google Drive:", driveError);
//             }
//          }
//          reject(error);
//       }
//    });

// // get cache
// export const getCache = (videoId) =>
//    new Promise(async (resolve, reject) => {
//       try {
//          const res = await db.Cache.findOne({
//             where: { file_id: videoId },
//             attributes: {
//                exclude: ["createdAt", "updatedAt"],
//             },
//          });
//          resolve({
//             err: res ? 0 : 1,
//             mess: res ? "got" : "cache not found",
//             cache: res,
//          });
//       } catch (error) {
//          reject(error);
//       }
//    });

// //   delete file and google drive
// export const deleteFile = (id, fileId, drive, generateUserFolderId) =>
//    new Promise(async (resolve, reject) => {
//       try {
//          const cache = await db.Cache.findOne({
//             where: {
//                user_id: id,
//             },
//             attributes: ["generateUserFolderId"],
//             raw: true,
//          });

//          // deleteFolder
//          if (cache.generateUserFolderId === generateUserFolderId) {
//             await deleteFolderThumbnail(id, cache.generateUserFolderId);
//          }

//          //   delete file google
//          if (fileId) {
//             try {
//                await drive.files.delete({
//                   fileId,
//                });
//             } catch (driveError) {
//                return resolve({
//                   err: 1,
//                   mess: driveError.errors || "not delete file google driver =>> invalid!",
//                });
//             }
//          }
//          //   delete database
//          const res = await db.Cache.destroy({
//             where: {generateUserFolderId},
//          });
//          resolve({
//             err: res ? 0 : 1,
//             mess: res ? "success!" : "Opss! not found cache into db.",
//          });
//       } catch (error) {
//          reject(error);
//       }
//    });

// //   delete db cache not google file
// export const deleteCache = (id, deleted) =>
//    new Promise(async (resolve, reject) => {
//       try {
//          // deleteFolder
//          const cache = await db.Cache.findOne({
//             where: {
//                user_id: id,
//             },
//             attributes: ["generateUserFolderId"],
//             raw: true,
//          });
//          // return console.log(cache.generateUserFolderId, deleted, id)
//          // delete folder
//          if (cache.generateUserFolderId === deleted) {
//             await deleteFolderThumbnail(id, deleted);
//          }
//          const res = await db.Cache.destroy({
//             where: {generateUserFolderId: deleted},
//          });

//          resolve({
//             err: res ? 0 : 1,
//             mess: res ? "success!" : "Opss! not found cache into db.",
//          });
//       } catch (error) {
//          reject(error);
//       }
//    });
