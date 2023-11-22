//export const GET_USER_ORDERS = 'GET_USER_ORDERS';

export const WS_USER_CONNECT = 'WS_USER_CONNECT';
export const WS_USER_DISCONNECT = 'WS_USER_DISCONNECT';

export const WS_USER_CONNECTING = 'WS_USER_CONNECTING';
export const WS_USER_OPEN = 'WS_USER_OPEN';
export const WS_USER_MESSAGE = 'WS_USER_MESSAGE';
export const WS_USER_ERROR = 'WS_USER_ERROR';
export const WS_USER_CLOSE = 'WS_USER_CLOSE';

export const connect = (url) => ({
    type: WS_USER_CONNECT,
    payload: url,
})

export const disconnect = () => ({
    type: WS_USER_DISCONNECT,
})
