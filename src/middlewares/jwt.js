import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// token auth
export const create_access_token = (res) => {
   return res
      ? jwt.sign(
           {
              id: res.id,
              email: res.email,
              role_code: res.role_code,
              verifyOTP: res.verifyOTP,
           },
           process.env.JWT_SECRET,
           { expiresIn: "2h" },
        )
      : null;
};

export const create_refresh_token = (id) => {
   return jwt.sign({ id }, process.env.JWT_SECRET_REFRESH, { expiresIn: "15d" });
};
