import cartReducer from "./cart-reducer";
import modalReducer from "./modal-reducer";
import loadingReducer from "./loading-reducer";
import orderReducer from "./order-reducer";
import { selectReducer } from "./select-reducer";
import { combineReducers } from 'redux';
import authReducer from "./auth-reducer";
import { routeReducer } from "./route-reducer";
import allOrdersReducer from "./all-orders-reducer";
import userOrdersReducer from "./user-orders-reducer";

export const rootReducer = combineReducers({
    cart: cartReducer,
    modal: modalReducer,
    loading: loadingReducer,
    selected: selectReducer,
    order: orderReducer,
    orders: allOrdersReducer,
    userOrders: userOrdersReducer,
    auth: authReducer,
    route: routeReducer,
})