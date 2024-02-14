import { SET_ROOT, REMOVE_ROOT } from "../actions/route-actions";
import { TRouteActions } from "../actions/route-actions";

type TRouteState = {
    route: string;
}

const initialState: TRouteState = {
    route: ''
}

export function routeReducer(state = initialState, action: TRouteActions): TRouteState {   
    
    switch (action.type) {
        case SET_ROOT:
            return {route: 'root'}
        case REMOVE_ROOT:
            return {route: ''}
        default:
            return state;
    }
}