export const isAdmin = (req, res, next) => {
    const {role_code} = req.user
    console.log(role_code)
    if(role_code !== "R1") return res.status(401).json({
        err: 1,
        mess: "require admin"
    })
    next()
}

export const isModerator = (req, res, next) => {
    const {role_code} = req.user
    if((role_code !== "R1") && (role_code !== "R2")) return res.status(401).json({
        err: 1,
        mess: "require admin or Moderator"
    })
    next()
}