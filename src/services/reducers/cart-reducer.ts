import { ADD_BUN, ADD_INGR, REMOVE_INGR, MOVE_INGR, STOP_MOVE, CLEAR_CART } from "../actions/cart-actions";
import { TCartActions } from '../actions/cart-actions';
import { TIngredient } from "../../utils/types-description";

export type TConstructIngredient = {
    ingredientData: TIngredient;
    key: string;
};

export type TDragIndexes = {
    dragIndex: number;
    hoverIndex: number;
};

type TCartState = {
    bun: TConstructIngredient | null;
    ingredients: Array<TConstructIngredient>;
    isDragging: number;
};

const initialState: TCartState = {
    bun: null,
    ingredients: [],
    isDragging: -1,
};


export default function cartReducer(state = initialState, action: TCartActions): TCartState {
    switch (action.type) {
        case ADD_BUN:
            return {...state, bun: action.payload};
        case ADD_INGR:
            return {...state, ingredients: [...state.ingredients, action.payload]};
        case REMOVE_INGR:                 
            const elementIndex = state.ingredients.findIndex(product => product.ingredientData._id === action.payload);
            const afterRemoveArray = [...state.ingredients];
            afterRemoveArray.splice(elementIndex, 1);

            return {...state, ingredients: [...afterRemoveArray]};
        case CLEAR_CART:
            return initialState;    
        case MOVE_INGR:
            const drag = action.payload.dragIndex;
            const hover = action.payload.hoverIndex;
            const newArray = [...state.ingredients];
            [newArray[drag], newArray[hover]] = [newArray[hover], newArray[drag]];
            
            return {
            ...state, ingredients: newArray, isDragging: hover,
            }
        case STOP_MOVE:
            return { ...state, isDragging: -1 }
        default:
            return state;
    }
}