import { webSocketStatus } from "../../utils/use-socket"
import { WS_CLOSE, WS_CONNECTING, WS_ERROR, WS_MESSAGE, WS_OPEN, WS_CONNECT } from "../actions/all-orders-actions";


const initialState = {
    status: webSocketStatus.OFFLINE,
    data: {},
    error: null,
}

export default function allOrdersReducer(state = initialState, action) {

    switch (action.type) {
        case WS_CONNECTING:
            return {
                ...state,
                status: webSocketStatus.CONNECTING,
            }
        case WS_OPEN:
            return {
                ...state,
                status: webSocketStatus.ONLINE,
            }
        case WS_ERROR:
            return {
                ...state,
                error: action.payload,
            }
        case WS_MESSAGE:
            return {
                ...state,
                data: action.payload,
            }
        case WS_CLOSE:
            return {
                ...state,
                status: webSocketStatus.OFFLINE,
            }
        default:
            return state;
    }
}