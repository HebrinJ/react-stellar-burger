import { ADD_BUN, ADD_INGR, REMOVE_INGR } from "../actions/cart-actions";

const initialState = {
    bun: null,
    ingredients: []
}


export default function cartReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_BUN:
            return {...state, bun: action.payload};
        case ADD_INGR:
            return {...state, ingredients: [...state.ingredients, action.payload]};
        case REMOVE_INGR:            
            const elementIndex = state.ingredients.findIndex(product => product._id === action.payload);           
            state.ingredients.splice(elementIndex, 1);            
            return {...state, ingredients: [...state.ingredients]};
        default:
            return state;
    }
}