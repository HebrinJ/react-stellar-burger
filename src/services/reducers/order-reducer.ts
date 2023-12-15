import { GET_ORDER_DATA, GET_ORDER_SUCCESS, GET_ORDER_FAILED, GET_ORDER_DETAILS, DETAILS_READY, RESET_DETAILS } from "../actions/order-actions";
import { TOrderActions } from "../actions/order-actions";

type TOrderDetails = {
    orders: Array<object>;
}

type TOrderState = {
    orderData: object;
    isLoading: boolean;
    isError: boolean;
    orderDetails: TOrderDetails;
    detailsReady: boolean;
}

const initialState: TOrderState = {
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

export default function orderReducer(state = initialState, action: TOrderActions) {    
    switch (action.type) {
        case GET_ORDER_DATA:
            return {
                ...state, isLoading: true
            }
        case GET_ORDER_SUCCESS:
            return {
                ...state, orderData: action.orderData, isLoading: false
            }
        case GET_ORDER_FAILED:
            return {
                ...state, isLoading: false, isError: true
            }
        case GET_ORDER_DETAILS:
            return {
                ...state, orderDetails: {
                    orders: action.orderData
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