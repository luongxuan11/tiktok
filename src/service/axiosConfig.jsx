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
    3. đính kèm vào header authorized
*/

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async(error) => {
    const originalConfig = error.config
    console.warn("accessToken expired!")
    if(error.response && error.response.status === 401){
      try {
        console.warn("call refreshToken api")
        const result = await instance.post(`${process.env.REACT_APP_SEVER_URL}/api/v1/user/refresh-token`)
        console.warn("check refresh token when called => ", result)

         // Update localStorage with the new token
         const newToken = result.access_token;
         const authData = JSON.parse(
           window.localStorage.getItem("persist:auth")
         );
         authData.token = `"${newToken}"`;
         window.localStorage.setItem("persist:auth", JSON.stringify(authData));
 
 
         // Update the authorization header in the original request config
         originalConfig.headers = { authorization: newToken };
 

        return instance(originalConfig)
      } catch (error) {
        // refresh token expired
        if(error.response && error.response.status === 419){
          console.error("refresh token expired")
          const res = await instance.get(`${process.env.REACT_APP_SEVER_URL}/api/v1/user/logout`)
          if(res.err === 0 || res.err === 1){
            window.localStorage.removeItem("persist:auth");
          }
        }
        return Promise.reject(error);
      }
    }
    return Promise.reject(error)
  }
);

export default instance;
