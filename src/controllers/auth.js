import * as services from "../services"
import {userName ,email, password, repeatPassword } from "../helpers/joi_schema"
import { badRequest, internalError } from "../middlewares/handleError"
import joi from "joi"

// register controller
export const register = async (req, res) =>{
    // console.log(req.body)
    try {
        const { error } = joi.object({userName ,email, password, repeatPassword}).validate(req.body)

        if(error) return badRequest(error.details[0]?.message, res)
        const response = await services.register(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return internalError(res, error.message)
    }
}


// login controller
export const login = async (req, res) => {
    try {
        const { error } = joi.object({email, password}).validate(req.body)
        if(error) return badRequest(error.details[0]?.message, res)

        const response = await services.login(req.body, res)
        return res.status(200).json(response)
    } catch (error) {
        console.log("auth: at row 30 =>>> here")
        return internalError(res, error.mess)
    }
}

// refresh accessToken
export const refreshAccessToken = async (req, res) => {
    try {
        const cookie = req.cookies
        if(!cookie && !cookie.refresh_token) return res.status(401).json({
            err: 1,
            mess: "No refresh token in cookies"
        })
        // console.log("===",cookie)

        const response = await services.refreshAccessToken(cookie, res)
        return res.status(200).json(response)
    } catch (error) {
        return internalError(res, error.mess)
    }
}


// logout
export const logout = async (req, res) => {
    try {
        const cookie = req.cookies;
        if (!cookie || !cookie.refresh_token) {
            throw new Error("Không có refresh token trong cookies");
        }

        // Xóa refresh token khỏi cơ sở dữ liệu
        await services.logout(cookie);

        // Xóa cookie refresh_token khỏi trình duyệt
        res.clearCookie("refresh_token", {
            httpOnly: true,
            secure: true
        });

        // Trả về phản hồi sau khi xóa cookie và cơ sở dữ liệu
        return res.status(200).json({
            err: 0, 
            mess: "Đăng xuất thành công." 
        });
    } catch (error) {
        return internalError(res, error.message);
    }
};