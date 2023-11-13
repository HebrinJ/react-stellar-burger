import { SET_ROOT, REMOVE_ROOT } from "../actions/route-actions";

const initialState = {
    route: ''
}

export function routeReducer(state = initialState, action) {   
    
    switch (action.type) {
        case SET_ROOT:
            return {route: 'root'}
        case REMOVE_ROOT:
            return {route: ''}
        default:
            return state;
    }
}