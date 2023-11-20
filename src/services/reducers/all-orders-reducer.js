import { GET_ORDERS } from "../actions/all-orders-actions"

const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
}

export default function allOrdersReducer(state = initialState, action) { 

    switch (action.type) {
        case GET_ORDERS:
            return {
                orders: action.payload.orders,
                total: action.payload.total,
                totalToday: action.payload.totalToday,
            }   
        default:
            return state;
    }

}