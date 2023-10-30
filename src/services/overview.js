import db from "../models";
import { v4 as generateId } from "uuid";

// create
export const createOverview = (id, privacy, file_name, file_id, body) =>
  new Promise(async (resolve, reject) => {
    try {
      await db.Overview.create({
        id: generateId(),
        user_id: id,
        title: body?.title || "",
        privacy,
        file_name,
        file_id,
      });

      resolve({
        err: 0,
        mess: "create success!",
      });
    } catch (error) {
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
