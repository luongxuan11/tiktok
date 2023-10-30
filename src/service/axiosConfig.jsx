import axios from "axios"
const instance = axios.create({
    baseURL: process.env.REACT_APP_SEVER_URL,
    withCredentials: true, // bật việc sử dụng cookie
});


instance.interceptors.request.use(
    function (config) {
      // thích hợp để gán header vào đây
      let token = JSON.parse(window.localStorage.getItem("persist:auth"))?.token.slice(1, -1);
      config.headers = {
        authorization: token ? `${token}` : null,
      };
  
      return config;
    },
    function (error) {
      // Làm gì đó với lỗi request
      console.log("check erro axiosConfig at row 15", error);
      return Promise.reject(error);
    }
);


// interceptors response
axios.interceptors.response.use(
  function (response) {
    // trước khi data gửi từ sever về thì sẽ chạy ở đây trước
    // refreshToken === 401 authorization!
    
    
    return response.data;
  },
  function (error) {
    // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
    return error.response.data;
  }
);

export default instance;
