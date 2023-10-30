import actionTypes from "../../actionType";
import {apiRegister, apiLogin} from "../../../service/apis"


// login
export const login = (payload) => async (dispatch) => {
    try {
    const response = await apiLogin(payload)
    if(response?.data.err === 0){
        dispatch({
            type: actionTypes.LOGIN_SUCCESS,
            data: response.data.access_token,
        })
    } else{
        console.log(response)
        dispatch({
            type: actionTypes.LOGIN_FAIL,
            data: response.data.mess
        })
    }

    } catch (error) {
        
        dispatch({
            type: actionTypes.LOGIN_FAIL,
            data: null
        })
    }
}


// logout
export const logout = () => ({
    type: actionTypes.LOGOUT
})