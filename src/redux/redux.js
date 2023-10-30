import rootReducer from "./store/reducers/rootReducer";
import persistStore from "redux-persist/es/persistStore"; // có nhiệm vụ giữ lại state
import { createStore, applyMiddleware } from "redux" //createStore là hàm để tạo một Redux store, nơi lưu trữ toàn bộ trạng thái của ứng dụng. Nó nhận vào một reducer là một hàm để xử lý các hành động (actions) và cập nhật trạng thái của ứng dụng
                                                    //applyMiddleware là một hàm middleware của Redux, được sử dụng để áp dụng các middleware vào Redux store. Middleware là các hàm trung gian giữa việc gửi hành động từ ứng dụng đến reducer.
                                                    // Nó có thể thực hiện các hoạt động như ghi log, gọi API, xử lý bất đồng bộ, và thay đổi hành động trước khi chúng đến reducer. 
import thunk from 'redux-thunk'

const reduxStore = () =>{
    const store = createStore(rootReducer, applyMiddleware(thunk))  // giúp chúng ta có thể gọi api trong lúc dispatch 1  action lên reducer 
                                                                    // thay về dispatch được 1 obj thì sẽ dispatch được 1 hàm
                                                                    
    const persistor = persistStore(store)  //giữ lại state =>> đảm bảo dữ liệu được giữ nguyên sau khi làm mới hoặc load lại

    return {store, persistor} // return theo kiểu obj
}
export default reduxStore