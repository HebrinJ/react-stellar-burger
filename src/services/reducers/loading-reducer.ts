import { LOAD_INGR_DATA, LOAD_INGR_SUCCESS, LOAD_INGR_FAILED } from "../actions/loading-actions";
import { TLoadActions } from "../actions/loading-actions";
import { TIngredient } from "../../utils/typesDescription";

type TLoadIngredientsState = {
    allIngredients: Array<TIngredient>;
    isLoading: boolean;
    isError: boolean;
}

const initialState: TLoadIngredientsState = {
    allIngredients: [],
    isLoading: false,
    isError: false,
}

export default function loadingReducer(state = initialState, action: TLoadActions): TLoadIngredientsState {
    
    switch (action.type) {
        case LOAD_INGR_DATA:
            return {
                ...state, isLoading: true
            }
        case LOAD_INGR_SUCCESS:
            return {
                ...state, allIngredients: action.data, isLoading: false
            }
        case LOAD_INGR_FAILED:
            return {
                ...state, isLoading: false, isError: true
            }    
        default:
            return state;
    }

}