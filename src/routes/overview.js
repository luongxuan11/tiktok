import * as controllers from "../controllers";
import express from "express";
const router = express.Router();
import { verifyToken } from "../middlewares/verify_token";
import { requireVerifyOtp } from "../middlewares/verify_uploadVideo";
import setupUploadFile from "../middlewares/uploadFileMuntipleCloudinary";

// private route
router.get("/limit", controllers.getPostLimit);
router.get("/get-current-post", controllers.getCurrentPost);
router.get("/limit--explore", controllers.getPostsExplore);

router.use(verifyToken);
router.post("/create-post", setupUploadFile, controllers.createNewPost);
router.get("/following", requireVerifyOtp, controllers.getPostsFollowing);
router.put("/update-post", requireVerifyOtp, controllers.updatePost);
router.post("/upload-favorite", controllers.uploadFavorite);
router.get("/video-user", controllers.getVideoOfUser);
router.get("/video-liked", requireVerifyOtp, controllers.getVideoLiked);
router.delete("/delete-post", requireVerifyOtp, controllers.deletePost);

export default router;
