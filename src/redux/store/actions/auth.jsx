import actionTypes from "../../actionType";
import { apiLogin } from "../../../service/apis";

// login
export const login = (payload) => async (dispatch) => {
   try {
      const response = await apiLogin(payload);
      if (response?.err === 0) {
         localStorage.setItem("refreshToken", response.refreshToken);
         dispatch({
            type: actionTypes.LOGIN_SUCCESS,
            data: response.access_token,
         });
      } else {
         console.log(response);
         dispatch({
            type: actionTypes.LOGIN_FAIL,
            data: response.mess,
         });
      }
   } catch (error) {
      dispatch({
         type: actionTypes.LOGIN_FAIL,
         data: null,
      });
   }
};

// logout
export const logout = () => ({
   type: actionTypes.LOGOUT,
});
