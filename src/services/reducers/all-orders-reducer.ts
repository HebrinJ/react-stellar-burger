import { WS_CLOSE, WS_CONNECTING, WS_ERROR, WS_MESSAGE, WS_OPEN } from "../actions/all-orders-actions";
import type { TWebSocketOrdersActions } from "../actions/all-orders-actions";
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

export default function allOrdersReducer(state = initialState, action: TWebSocketOrdersActions): TWebSocketState {

    switch (action.type) {
        case WS_CONNECTING:
            return {
                ...state,
                status: TWebSocketStatus.CONNECTING,
            }
        case WS_OPEN:
            return {
                ...state,
                status: TWebSocketStatus.ONLINE,
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
                status: TWebSocketStatus.OFFLINE,
            }
        default:
            return state;
    }
}