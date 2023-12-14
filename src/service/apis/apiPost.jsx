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