import actionTypes from "../../actionType";
const initState = {
   post: [],
   mess: "",
};

const postReducer = (state = initState, action) => {
   switch (action.type) {
      case actionTypes.GET_POST:
      case actionTypes.GET_POST_LIMIT:
         return {
            ...state,
            post: action.posts || [],
            mess: action.mess || "",
         };
      case actionTypes.GET_POST_FALSE:
         return {
            ...state,
            post: [],
            mess: "false",
         };
      default:
         return state;
   }
};

export default postReducer;
