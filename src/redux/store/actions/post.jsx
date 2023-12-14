import actionTypes from "../../actionType";
import { apiGetPostsLimit } from "../../../service/apis/apiPost";

export const getPostsLimit = (page) => async (dispatch) => {
    try {
    const response = await apiGetPostsLimit(page)
    if(response?.err === 0){  
        dispatch({ 
            type: actionTypes.GET_POST_LIMIT,
            posts: response.res.rows,
            count: response.res?.count,
            mess: response.mess
        })
    } else{
        dispatch({
            type: actionTypes.GET_POST_LIMIT,
            mess: response.mess
        })
    }
    } catch (error) {
        
        dispatch({
            type: actionTypes.GET_POST_LIMIT,
            posts: null
        })
    }
}

// getPost false
export const getPostFalse = () => ({
    type: actionTypes.GET_POST_FALSE
})