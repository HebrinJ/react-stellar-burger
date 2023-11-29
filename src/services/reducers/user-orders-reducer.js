import { webSocketStatus } from "../../utils/use-socket"
import { WS_USER_CLOSE, WS_USER_CONNECTING, WS_USER_ERROR, WS_USER_MESSAGE, WS_USER_OPEN, WS_CONNECT } from "../actions/user-orders-actions";

const initialState = {
    status: webSocketStatus.OFFLINE,
    userData: {},
    error: null,
}

export default function userOrdersReducer(state = initialState, action) {

    switch (action.type) {
        case WS_USER_CONNECTING:
            return {
                ...state,
                status: webSocketStatus.CONNECTING,
            }
        case WS_USER_OPEN:
            return {
                ...state,
                status: webSocketStatus.ONLINE,
            }
        case WS_USER_ERROR:
            return {
                ...state,
                error: action.payload,
            }
        case WS_USER_MESSAGE:
            return {
                ...state,
                userData: action.payload,
            }
        case WS_USER_CLOSE:
            return {
                ...state,
                status: webSocketStatus.OFFLINE,
            }
        default:
            return state;
    }
}