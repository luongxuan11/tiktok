import * as controllers from "../controllers"
import express from "express"
const router = express.Router()

router.post("/register", controllers.register)
router.post("/login", controllers.login)
router.get("/forgot", controllers.forgotPassword)
router.put("/reset-password", controllers.checkResetPassword)

export default router