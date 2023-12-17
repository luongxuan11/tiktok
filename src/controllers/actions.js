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
