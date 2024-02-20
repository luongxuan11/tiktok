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

export const apiCheckIdInvalid = (tikTokId) =>
   new Promise(async (resolve, reject) => {
      try {
         const response = await axiosConfig({
            method: "get",
            url: "/api/v1/user/check-id",
            params: tikTokId,
         });
         resolve(response);
      } catch (error) {
         reject(error);
      }
   });

export const apiUpdateImageUser = (avatar) =>
   new Promise(async (resolve, reject) => {
      try {
         const formData = new FormData();
         Object.keys(avatar).forEach((key) => {
            formData.append(key, avatar[key]);
         });
         const response = await axiosConfig({
            method: "put",
            url: "/api/v1/user/update-image-user",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
         });
         resolve(response);
      } catch (error) {
         reject(error);
      }
   });

export const apiUpdateUser = (payload) =>
   new Promise(async (resolve, reject) => {
      try {
         const response = await axiosConfig({
            method: "put",
            url: "/api/v1/user/update-user",
            data: payload,
         });
         resolve(response);
      } catch (error) {
         reject(error);
      }
   });
