import auth from "./auth"
import userRouter from "./user"
import overview from "./overview"
import { notfound } from "../middlewares/handleError"

const initRouter = (app) =>{
    app.use('/api/v1/user', userRouter)
    app.use('/api/v1/auth', auth)
    app.use('/api/v1/overview', overview)

    app.use(notfound)
}

export default initRouter