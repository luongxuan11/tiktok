import jwt from "jsonwebtoken"
import {notAuth} from "./handleError"

export const verifyToken = (req, res, next) =>{
    const token = req.headers.authorization
    if(!token) return notAuth('Require authorization...', res)
    const accessToken = token.split(' ')[1]

    jwt.verify(accessToken, process.env.JWT_SECRET, (err, decode) =>{
        if(err) return notAuth('Access token may be expired or invalid', res)

        req.user = decode
        // console.log(decode)
        next()
    })
}