import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage"; // khi reload trang thì giá trị k đổi nên sẽ lưu nó dưới local
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import authReducer from "./authReducer";
import getUserCurrent from "./userReducer";

import persistReducer from "redux-persist/es/persistReducer";

const commonConfig = {
   // biến thành 1 obj
   storage, // config nơi lưu là storage
   stateReconciler: autoMergeLevel2,
};

const authConfig = {
   ...commonConfig, // 1 obj ở trên lưu trữ và merge
   key: "auth", //key xác định tên cho phần state được lưu trữ trong bộ nhớ cục bộ // nhìn ở aplication thì sẽ thấy persist: auth
   whitelist: ["isLogin", "token"], //whitelist chỉ định các thuộc tính của state cần được lưu trữ trong bộ nhớ cục bộ, trong trường hợp này chỉ có isLoggedIn và token.
};

const rootReducer = combineReducers({
   // như trên đã nói hàm combine này gán cho biến có tên là rootReducer
   auth: persistReducer(authConfig, authReducer),
   user: getUserCurrent

});

export default rootReducer; //export ra file redux
