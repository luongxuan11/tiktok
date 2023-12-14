import actionTypes from "../../actionType";
const initState = {
   post: [],
   mess: "",
   count: 0,
};

const postReducer = (state = initState, action) => {
   switch (action.type) {
      case actionTypes.GET_POST:
      case actionTypes.GET_POST_LIMIT:
         return {
            ...state,
            post: action.posts || [],
            mess: action.mess || "",
            count: action.count || 0,
         };
      case actionTypes.GET_POST_FALSE:
         return {
            ...state,
            post: [],
            mess: "false",
            count: 0,
         };
      default:
         return state;
   }
};

export default postReducer;
