import * as controllers from "../controllers";
import express from "express";
const router = express.Router();
import { verifyToken } from "../middlewares/verify_token";

router.get("/search-detail", controllers.search);

router.get("/follow", verifyToken,controllers.follower);
router.get("/follower", verifyToken, controllers.getFollower);

export default router;
