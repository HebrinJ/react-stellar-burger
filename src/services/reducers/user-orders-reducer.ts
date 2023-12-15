//import { webSocketStatus } from "../../utils/use-socket"
import { WS_USER_CLOSE, WS_USER_CONNECTING, WS_USER_ERROR, WS_USER_MESSAGE, WS_USER_OPEN } from "../actions/user-orders-actions";
import type { TWebSocketUserActions } from "../actions/user-orders-actions";
import { TWebSocketStatus } from "../../utils/use-socket";
import type { TWebSocketState } from "../../utils/use-socket";

const initialState: TWebSocketState = {
    status: TWebSocketStatus.OFFLINE,
    data: {
        success: false,
        orders: [],
        total: 0,
        totalToday: 0,
    },
    error: null,
}

export default function userOrdersReducer(state = initialState, action: TWebSocketUserActions): TWebSocketState {

    switch (action.type) {
        case WS_USER_CONNECTING:
            return {
                ...state,
                status: TWebSocketStatus.CONNECTING,
            }
        case WS_USER_OPEN:
            return {
                ...state,
                status: TWebSocketStatus.ONLINE,
            }
        case WS_USER_ERROR:
            return {
                ...state,
                error: action.payload,
            }
        case WS_USER_MESSAGE:
            return {
                ...state,
                data: action.payload,
            }
        case WS_USER_CLOSE:
            return {
                ...state,
                status: TWebSocketStatus.OFFLINE,
            }
        default:
            return state;
    }
}