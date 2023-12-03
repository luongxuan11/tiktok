import * as controllers from "../controllers"
import express from "express"
import { verifyToken } from "../middlewares/verify_token"
const router = express.Router()
import googleDriveCloud from "../middlewares/uploadFileGoogleCloud"
import { requireVerifyOtp } from "../middlewares/verify_uploadVideo"

// private route
router.use(verifyToken)
router.use(requireVerifyOtp)
router.post('/create-video', googleDriveCloud ,controllers.createNewPost)
router.get('/get-cache',controllers.getCache)
router.post('/delete-video',controllers.deleteFile)
router.delete('/delete-cache',controllers.deleteCache)


export default router