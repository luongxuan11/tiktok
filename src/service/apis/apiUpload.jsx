import axiosConfig from "../axiosConfig"

export const apiUpload = (payload) => new Promise(async (resolve, reject) => {
    try {
      const formData = new FormData();
      Object.keys(payload).forEach((key) => {
        formData.append(key, payload[key]);
      });
      const response = await axiosConfig({
        method: "post",
        url: "/api/v1/overview/create-post",
        data: formData,
        headers: {"Content-Type": "multipart/form-data"},
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });