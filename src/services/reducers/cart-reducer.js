import { ADD_BUN, ADD_INGR, REMOVE_INGR, MOVE_INGR, STOP_MOVE } from "../actions/cart-actions";

const initialState = {
    bun: null,
    ingredients: [],
    isDragging: -1,
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
        case MOVE_INGR:
            const drag = action.payload.dragIndex;
            const hover = action.payload.hoverIndex;
            [state.ingredients[drag], state.ingredients[hover]] = [state.ingredients[hover], state.ingredients[drag]]           
            
            return {
            ...state, ingredients: state.ingredients, isDragging: hover,
            }
        case STOP_MOVE:
            return { ...state, isDragging: -1 }
        default:
            return state;
    }
}