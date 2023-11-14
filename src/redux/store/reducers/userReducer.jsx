import actionTypes from "../../actionType"

const initState = { // trong reducer cơ bản có 2 phần đầu tiên là initState
    currentData: {}
}

const getUserCurrent = (state = initState, action) =>{ // reducer cơ bản là 1 hàm => nhận 2 đối số 1 là state với giá trị khởi tạo là innitState, 2 là action nhận thông qua dispatch của redux
    switch (action.type) {
       case actionTypes.GET_CURRENT:
        return{
            ...state,
            currentData: action.currentData || {}
        }
        case actionTypes.LOGOUT:
        return{
            ...state,
            currentData: {}
        }
        default:
            return state
    }
}

export default getUserCurrent