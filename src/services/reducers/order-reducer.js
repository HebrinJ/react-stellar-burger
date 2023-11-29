import { GET_ORDER_DATA, GET_ORDER_SUCCESS, GET_ORDER_FAILED, GET_ORDER_DETAILS, DETAILS_READY, RESET_DETAILS } from "../actions/order-actions";

const initialState = {
    orderData: {},
    isLoading: false,
    isError: false,
    orderDetails: {
        orders: [{
            _id: '',
            ingredients: [],
            owner: '',
            status: '',
            name: '',
            createdAt: '',
            updatedAt: '',
            number: 0,
        }],        
    },
    detailsReady: false,
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
        case GET_ORDER_DETAILS:
            return {
                ...state, orderDetails: {
                    orders: action.payload
                }
            }
        case DETAILS_READY:
            return {
                ...state, detailsReady: true
            }
        case RESET_DETAILS:
            return initialState;
        default:
            return state;
    }

}