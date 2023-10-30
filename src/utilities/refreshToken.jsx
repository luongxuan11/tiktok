import axios from "../service/axiosConfig"
function getRefreshTokenFromCookie() {
    // Lấy refreshToken từ cookie ở phía máy khách
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [name, value] = cookie.split('=');
      if (name === 'refreshToken') {
        return value;
      }
    }
    return null; 
}

const refreshToken = async() =>{
  const getRefreshToken = getRefreshTokenFromCookie()
  if(!refreshToken){
    console.log("not found token in cookie")
    return;
  }
  try {
    const response = await axios.post("", {
      getRefreshToken
    })
    console.log(response)
  } catch (error) {
    return error
  }
}