import actionTypes from "../../actionType";
import {apiGetUser, apiLogout} from "../../../service/apis"


export const getUserCurrent = () => async (dispatch) => {  
    try {
    const response = await apiGetUser()
    // console.log(response)
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
        dispatch({type: actionTypes.LOGOUT})
        await apiLogout()
    }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_CURRENT,
            currentData: null,
            mess: error
        })
        dispatch({type: actionTypes.LOGOUT})
        await apiLogout()
    }
}