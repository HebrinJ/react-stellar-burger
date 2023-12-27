import { TOrdersData } from "../../utils/use-socket";

export const WS_CONNECT: 'WS_CONNECT' = 'WS_CONNECT';
export const WS_DISCONNECT: 'WS_DISCONNECT' = 'WS_DISCONNECT';

export const WS_CONNECTING: 'WS_CONNECTING' = 'WS_CONNECTING';
export const WS_OPEN: 'WS_OPEN' = 'WS_OPEN';
export const WS_MESSAGE: 'WS_MESSAGE' = 'WS_MESSAGE';
export const WS_ERROR: 'WS_ERROR' = 'WS_ERROR';
export const WS_CLOSE: 'WS_CLOSE' = 'WS_CLOSE';

export interface IWsConnectAction {
    readonly type: typeof WS_CONNECT;
    readonly url: string;
}

export interface IWsDisconnectAction {
    readonly type: typeof WS_DISCONNECT;
}

export interface IWsConnectingAction {
    readonly type: typeof WS_CONNECTING;
}

export interface IWsOpenAction {
    readonly type: typeof WS_OPEN;
}

export interface IWsMessageAction {
    readonly type: typeof WS_MESSAGE;
    readonly payload: TOrdersData;
}

export interface IWsErrorAction {
    readonly type: typeof WS_ERROR;
    readonly payload: string;
}

export interface IWsCloseAction {
    readonly type: typeof WS_CLOSE;
}

export const connect = (url: string): IWsConnectAction => ({
    type: WS_CONNECT,
    url
})

export const disconnect = (): IWsDisconnectAction => ({
    type: WS_DISCONNECT,
})

export type TWebSocketOrdersActions = 
    IWsConnectAction |
    IWsDisconnectAction |
    IWsConnectingAction |
    IWsOpenAction |
    IWsMessageAction |
    IWsErrorAction |
    IWsCloseAction;