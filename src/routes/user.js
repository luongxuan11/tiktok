import * as controllers from "../controllers"
import express from "express"
import { verifyToken } from "../middlewares/verify_token"
import {isAdmin} from "../middlewares"
import uploadCloud from "../middlewares/uploadFileCloudinary"
const userRouter = express.Router()

userRouter.post('/refresh-token', controllers.refreshAccessToken)
userRouter.get('/logout', controllers.logout)
// private route
userRouter.use(verifyToken)
userRouter.get('/', controllers.getUserCurrent)
userRouter.put('/update-image-user', uploadCloud.single("image") ,controllers.updateImageUser)
userRouter.put('/update-user', controllers.updateUser)
userRouter.put('/update-password', controllers.changePassword)
userRouter.post('/delete-user', controllers.deleteUser)
userRouter.post('/send-otp', controllers.sendOtp)
userRouter.put('/verify-otp', controllers.verifyOtp)



export default userRouter