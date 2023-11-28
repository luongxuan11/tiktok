import actionTypes from "../../actionType";
import {apiGetUser, apiLogout} from "../../../service/apis"


export const getUserCurrent = () => async (dispatch) => {  
    try {
    const response = await apiGetUser()
    if(response.err === 0){  
        dispatch({
            type: actionTypes.GET_CURRENT,
            currentData: response.userData,
            mess: response.mess 
        })
    } else{
        dispatch({ 
            type: actionTypes.GET_CURRENT,
            currentData: null,
            mess: response.mess
        })
        await apiLogout()
        dispatch({type: actionTypes.LOGOUT})
    }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_CURRENT,
            currentData: null,
            mess: error
        })
        dispatch({type: actionTypes.LOGOUT})
    }
}