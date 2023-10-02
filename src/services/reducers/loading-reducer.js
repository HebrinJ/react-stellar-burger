import { LOAD_INGR_DATA, LOAD_INGR_SUCCESS, LOAD_INGR_FAILED } from "../actions/loading-actions";

const initialState = {
    allIngredients: [],
    isLoading: false,
    isError: false,
}

export default function loadingReducer(state = initialState, action) {    
    switch (action.type) {
        case LOAD_INGR_DATA:
            return {
                ...state, isLoading: true
            }
        case LOAD_INGR_SUCCESS:
            return {
                ...state, allIngredients: action.payload, isLoading: false
            }
        case LOAD_INGR_FAILED:
            return {
                ...state, isLoading: false, isError: true
            }    
        default:
            return state;
    }

}