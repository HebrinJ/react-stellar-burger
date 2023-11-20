import { GET_USER_ORDERS } from "../actions/user-orders-actions"

const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
}

export default function userOrdersReducer(state = initialState, action) { 

    switch (action.type) {
        case GET_USER_ORDERS:
            return {
                orders: action.payload.orders,
                total: action.payload.total,
                totalToday: action.payload.totalToday,
            }   
        default:
            return state;
    }

}