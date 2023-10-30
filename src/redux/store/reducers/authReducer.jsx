import actionTypes from "../../actionType";
const initState = {
   isLogin: false,
   token: null,
   mess: "",
   update: false,
};

const authReducer = (state = initState, action) => {
   switch (action.type) {
      case actionTypes.LOGIN_SUCCESS:
         return {
            ...state,
            isLogin: true,
            token: action.data,
            mess: "",
         };
      case actionTypes.LOGIN_FAIL:
         return {
            ...state,
            isLogin: false,
            token: null,
            mess: action.data,
            update: !state.update,
         };
      case actionTypes.LOGOUT:
         return {
            ...state,
            isLogin: false,
            token: null,
            mess: "",
         };
      default:
         return state;
   }
};

export default authReducer;
