import * as controllers from "../controllers"
import express from "express"
const router = express.Router()
import { verifyToken } from "../middlewares/verify_token"
import { requireVerifyOtp } from "../middlewares/verify_uploadVideo"
import setupUploadFile from "../middlewares/uploadFileMuntipleCloudinary"

// private route
router.use(verifyToken)
router.post('/create-post',requireVerifyOtp,setupUploadFile,controllers.createNewPost)
router.get('/get-post',controllers.getPostOfUser)




export default router