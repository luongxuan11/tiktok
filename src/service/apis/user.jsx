import axiosConfig from "../axiosConfig";

export const apiGetCurrentUser = () =>
   new Promise(async (resolve, reject) => {
      try {
         const response = await axiosConfig({
            method: "get",
            url: "/api/v1/user",
         });
         resolve(response);
      } catch (error) {
         reject(error);
      }
   });

export const apiGetUser = (payload) =>
   new Promise(async (resolve, reject) => {
      try {
         const response = await axiosConfig({
            method: "get",
            url: "/api/v1/user/get-user",
            params: payload,
         });
         resolve(response);
      } catch (error) {
         reject(error);
      }
   });

export const apiSendOtp = (otp) =>
   new Promise(async (resolve, reject) => {
      try {
         const response = await axiosConfig({
            method: "post",
            url: "/api/v1/user/send-otp",
            data: otp,
         });
         resolve(response);
      } catch (error) {
         reject(error);
      }
   });

export const apiVerifyOtp = (otp) =>
   new Promise(async (resolve, reject) => {
      try {
         const response = await axiosConfig({
            method: "put",
            url: "/api/v1/user/verify-otp",
            data: otp,
         });
         resolve(response);
      } catch (error) {
         reject(error);
      }
   });
