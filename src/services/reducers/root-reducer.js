import cartReducer from "./cart-reducer";
import modalReducer from "./modal-reducer";
import loadingReducer from "./loading-reducer";
import { selectReducer } from "./select-reducer";
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
    cart: cartReducer,
    modal: modalReducer,
    loading: loadingReducer,
    selected: selectReducer,
})

// export function rootReducer(state, action) {
//     return {
//         cart: cartReducer,
//         modal: modalReducer,
//         loading: loadingReducer,
//     }
// }