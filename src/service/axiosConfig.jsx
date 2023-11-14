import axios from "axios"
const instance = axios.create({
    baseURL: process.env.REACT_APP_SEVER_URL,
    withCredentials: true, // bật việc sử dụng cookie
});


/*
  --- add token into header ---
  1. Một cụm interceptors bao gồm req, res
*/
instance.interceptors.request.use(
    (config) => {
      let token = JSON.parse(window.localStorage.getItem("persist:auth"))?.token.slice(1, -1);
      config.headers = {authorization: token ? `${token}` : null};
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);


/*
    --- bộ res bao gồm ---\
    1. status 200 
    2. status ngoài 200 bắt đầu gọi api refresh token
*/

instance.interceptors.response.use(
 (response) => {
    return response.data;
  },
 async(error) => {
    const originalConfig = error.config
    console.log("accessToken expired!")
    if(error.response && error.response.status === 401){
      try {
        console.log("call refreshToken api")
        const result = await instance.post(`${process.env.REACT_APP_SEVER_URL}/api/v1/user/refresh-token`)
        console.log("check refresh token when called => ", result)
      } catch (error) {
        
      }
    }
  }
);

export default instance;
