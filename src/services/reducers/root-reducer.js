import cartReducer from "./cart-reducer";
import modalReducer from "./modal-reducer";
import loadingReducer from "./loading-reducer";
import orderReducer from "./order-reducer";
import { selectReducer } from "./select-reducer";
import { combineReducers } from 'redux';
import authReducer from "./auth-reducer";

export const rootReducer = combineReducers({
    cart: cartReducer,
    modal: modalReducer,
    loading: loadingReducer,
    selected: selectReducer,
    order: orderReducer,
    auth: authReducer,
})