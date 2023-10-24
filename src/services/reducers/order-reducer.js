import { GET_ORDER_DATA, GET_ORDER_SUCCESS, GET_ORDER_FAILED } from "../actions/order-actions";

const initialState = {
    orderData: {},
    isLoading: false,
    isError: false,
}

export default function orderReducer(state = initialState, action) {    
    switch (action.type) {
        case GET_ORDER_DATA:
            return {
                ...state, isLoading: true
            }
        case GET_ORDER_SUCCESS:
            return {
                ...state, orderData: action.payload, isLoading: false
            }
        case GET_ORDER_FAILED:
            return {
                ...state, isLoading: false, isError: true
            }    
        default:
            return state;
    }

}