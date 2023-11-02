import joi from "joi"

export const userName = joi.string().min(1).max(20).required()
export const email = joi.string().lowercase().pattern(new RegExp('gmail.com')).required()
export const password = joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(6).max(30).required()
export const newPassword = joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(6).max(30).required()
export const repeatPassword = joi.string().valid(joi.ref('password')).required();
export const token = joi.string().required()