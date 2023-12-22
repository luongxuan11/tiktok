import axiosConfig from "../axiosConfig";

export const apiSearch = (text) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: `/api/v1/actions/search-detail`,
        params: text,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

  export const apiFollow = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: `/api/v1/actions/follow`,
        params: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

  export const apiGetFollow = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: `/api/v1/actions/follower`,
        params: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });