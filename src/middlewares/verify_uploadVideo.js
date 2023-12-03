export const requireVerifyOtp = (req, res, next) => {
    const {verifyOTP} = req.user
    if(verifyOTP !== 1) return res.status(401).json({
        err: 1,
        mess: "Request account verification"
    })
    next()
}