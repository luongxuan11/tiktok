import axiosConfig from "../axiosConfig";

export const apiGetPostsLimit = (lazyLoad) =>
   new Promise(async (resolve, reject) => {
      try {
         const response = await axiosConfig({
            method: "get",
            url: `/api/v1/overview/limit`,
            params: lazyLoad,
         });
         resolve(response);
      } catch (error) {
         reject(error);
      }
   });

export const apiGetCurrentPost = (post_id) =>
   new Promise(async (resolve, reject) => {
      try {
         const response = await axiosConfig({
            method: "get",
            url: `/api/v1/overview/get-current-post`,
            params: post_id,
         });
         resolve(response);
      } catch (error) {
         reject(error);
      }
   });

export const apiUpdateFavorite = (payload) =>
   new Promise(async (resolve, reject) => {
      try {
         const response = await axiosConfig({
            method: "post",
            url: `/api/v1/overview/upload-favorite`,
            data: payload,
         });
         resolve(response);
      } catch (error) {
         reject(error);
      }
   });

// api get post of user
export const apiGetVideoOfUser = (payload) =>
   new Promise(async (resolve, reject) => {
      const response = await axiosConfig({
         method: "get",
         url: "/api/v1/overview/video-user",
         params: payload,
      });
      resolve(response);
      try {
      } catch (error) {
         reject(error);
      }
   });

// api get post explore
export const apiGetVideoExplore = (payload) =>
   new Promise(async (resolve, reject) => {
      const response = await axiosConfig({
         method: "get",
         url: "/api/v1/overview/limit--explore",
         params: payload,
      });
      resolve(response);
      try {
      } catch (error) {
         reject(error);
      }
   });

// api get post following
export const apiGetVideoFollowing = (payload) =>
   new Promise(async (resolve, reject) => {
      const response = await axiosConfig({
         method: "get",
         url: "/api/v1/overview/following",
         params: payload,
      });
      resolve(response);
      try {
      } catch (error) {
         reject(error);
      }
   });
