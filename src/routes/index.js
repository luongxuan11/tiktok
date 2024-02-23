import auth from "./auth";
import userRouter from "./user";
import overview from "./overview";
import actions from "./actions";
import { notfound } from "../middlewares/handleError";

const initRouter = (app, io) => {
   app.use((req, res, next) => {
      req.io = io;
      next();
   });
   app.use("/api/v1/user", userRouter);
   app.use("/api/v1/auth", auth);
   app.use("/api/v1/overview", overview);
   app.use("/api/v1/actions", actions);
   app.use(notfound);
};

export default initRouter;
