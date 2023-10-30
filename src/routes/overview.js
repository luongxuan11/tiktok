import * as controllers from "../controllers"
import express from "express"
import { verifyToken } from "../middlewares/verify_token"
const router = express.Router()

// private route
router.use(verifyToken)
router.post('/create-post',controllers.createOverview)
router.get('/get-post',controllers.getPostOfUser)



export default router