import cartReducer from "./cart-reducer";
import modalReducer from "./modal-reducer";
import loadingReducer from "./loading-reducer";
import orderReducer from "./order-reducer";
import { selectReducer } from "./select-reducer";
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
    cart: cartReducer,
    modal: modalReducer,
    loading: loadingReducer,
    selected: selectReducer,
    order: orderReducer,
})