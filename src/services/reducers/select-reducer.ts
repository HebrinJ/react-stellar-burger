import { SELECT_ITEM, UNSELECT } from "../actions/select-actions";
import { TSelectedActions } from "../actions/select-actions";
import { TIngredient } from "../../utils/typesDescription";

const initialState: TIngredient = {
    _id: '',
    type: '',
    name: '',
    proteins: 0,
    price: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    image: '',
    image_large: '',
    image_mobile: '',
    __v: 0,
}

export function selectReducer(state = initialState, action: TSelectedActions) {   
    
    switch (action.type) {
        case SELECT_ITEM:
            localStorage.setItem('selected', JSON.stringify(action.ingredient));
            return action.ingredient;
        case UNSELECT:
            localStorage.setItem('selected', '');
            return initialState;
        default:
            return state;
    }
}