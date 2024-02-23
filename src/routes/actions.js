import * as controllers from "../controllers";
import express from "express";
const router = express.Router();
import { verifyToken } from "../middlewares/verify_token";

router.get("/search-detail", controllers.search);

router.get("/follow", verifyToken,controllers.follower);
router.get("/follower", verifyToken, controllers.getFollower);
router.post("/comment-detail", verifyToken, controllers.uploadComment);
router.delete("/comment-detail--delete", verifyToken, controllers.deleteComment);
router.post("/comment-detail--feedback", verifyToken, controllers.uploadFeedback);

export default router;
