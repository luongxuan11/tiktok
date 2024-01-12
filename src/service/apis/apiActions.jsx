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

  export const apiUploadComment = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "post",
        url: `/api/v1/actions/comment-detail`,
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

  export const apiFeedbackComment = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "post",
        url: `/api/v1/actions/comment-detail--feedback`,
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

  export const apiDeleteComment = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "delete",
        url: `/api/v1/actions/comment-detail--delete`,
        params: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });