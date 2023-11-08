import { SELECT_ITEM, UNSELECT } from "../actions/select-actions";

const initialState = {
    itemId: '',
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
}

export function selectReducer(state = initialState, action) {   
    
    switch (action.type) {
        case SELECT_ITEM:
            localStorage.setItem('selected', JSON.stringify(action.payload))
            return action.payload;
        case UNSELECT:
            localStorage.setItem('selected', null)
        default:
            return state;
    }
}