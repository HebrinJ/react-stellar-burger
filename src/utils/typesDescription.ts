import { TWebSocketOrdersActions } from "../services/actions/all-orders-actions";
import { TWebSocketUserActions } from "../services/actions/user-orders-actions";
import { WS_CLOSE, WS_CONNECT, WS_CONNECTING, WS_DISCONNECT, WS_ERROR, WS_MESSAGE, WS_OPEN  } from "../services/actions/all-orders-actions";
import { WS_USER_CLOSE, WS_USER_CONNECT, WS_USER_CONNECTING, WS_USER_DISCONNECT, WS_USER_ERROR, WS_USER_MESSAGE, WS_USER_OPEN } from "../services/actions/user-orders-actions";

export type TIngredient = {
    _id: string;
    name: string;
    type: '' | 'bun' | 'sauce' | 'main';
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v?: number;
};

// export type TWebSocketActions = TWebSocketUserActions | TWebSocketOrdersActions

// export type TWebSocketTemplate = {
//   wsConnect: TWebSocketActions;
//   onOpen: TWebSocketActions;
//   onClose: TWebSocketActions;
//   onError: TWebSocketActions;
//   onMessage: TWebSocketActions;
//   wsConnecting: TWebSocketActions;
//   wsDisconnect: TWebSocketActions;
// };

export type TWebSocketActions = {
   wsConnect: typeof WS_CONNECT | typeof WS_USER_CONNECT;
   onOpen: typeof WS_OPEN | typeof WS_USER_OPEN;
   onClose: typeof WS_CLOSE | typeof WS_USER_CLOSE;
   onError: typeof WS_ERROR | typeof WS_USER_ERROR;
   onMessage: typeof WS_MESSAGE | typeof WS_USER_MESSAGE;
   wsConnecting: typeof WS_CONNECTING | typeof WS_USER_CONNECTING;
   wsDisconnect: typeof WS_DISCONNECT | typeof WS_USER_DISCONNECT;
};

