import axiosConfig from "../axiosConfig";

export const apiRegister = (payload) =>
   new Promise(async (resolve, reject) => {
      // có 1 time số (payload) và sẽ nhận đối số là name password và phone
      try {
         const response = await axiosConfig({
            method: "post",
            url: "/api/v1/auth/register",
            data: payload,
         });
         resolve(response);
      } catch (error) {
         reject(error);
      }
   });

// login
export const apiLogin = (payload) =>
   new Promise(async (resolve, reject) => {
      try {
         const response = await axiosConfig({
            method: "post",
            url: "/api/v1/auth/login",
            data: payload,
         });

         resolve(response);
      } catch (error) {
         reject(error);
      }
   });

// logout
export const apiLogout = (refreshToken) =>
   new Promise(async (resolve, reject) => {
      try {
         const response = await axiosConfig({
            method: "get",
            url: "/api/v1/user/logout",
            params: refreshToken,
         });
         resolve(response);
      } catch (error) {
         reject(error);
      }
   });

// forgot
export const apiForgotPassword = (email) =>
   new Promise(async (resolve, reject) => {
      try {
         const response = await axiosConfig({
            method: "get",
            url: "/api/v1/auth/forgot",
            params: email,
         });
         resolve(response);
      } catch (error) {
         reject(error);
      }
   });

// reset password
export const apiResetPassword = (payload) =>
   new Promise(async (resolve, reject) => {
      try {
         const response = await axiosConfig({
            method: "put",
            url: "/api/v1/auth/reset-password",
            data: payload,
         });
         resolve(response);
      } catch (error) {
         reject(error);
      }
   });
