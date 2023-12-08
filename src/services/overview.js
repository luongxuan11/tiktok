import db from "../models";
import { v4 as generateId } from "uuid";
import deleteFilesOnDrive from "../helpers/deleteFileOnDrive";

// create
export const createNewPost = (id, fileDetails, body, authDrive) =>
  new Promise(async (resolve, reject) => {
    try {
      await db.Overview.create({
        id: generateId(),
        user_id: id,
        title: body?.title || "",
        privacy: body.privacy,
        comment_status: body.comment_status,
        video_file_name: fileDetails[0].fileUrl,
        video_file_id: fileDetails[0].fileId,
        image_file_name: fileDetails[1].fileUrl,
        image_file_id: fileDetails[1].fileId,
        tag: body?.tag || null
      });

      resolve({
        err: 0,
        mess: "create success!",
      });
    } catch (error) {
      await deleteFilesOnDrive(fileDetails, authDrive)
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
