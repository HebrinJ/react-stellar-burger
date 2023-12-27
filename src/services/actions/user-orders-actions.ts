export const WS_USER_CONNECT: 'WS_USER_CONNECT' = 'WS_USER_CONNECT';
export const WS_USER_DISCONNECT: 'WS_USER_DISCONNECT' = 'WS_USER_DISCONNECT';

export const WS_USER_CONNECTING: 'WS_USER_CONNECTING' = 'WS_USER_CONNECTING';
export const WS_USER_OPEN: 'WS_USER_OPEN' = 'WS_USER_OPEN';
export const WS_USER_MESSAGE: 'WS_USER_MESSAGE' = 'WS_USER_MESSAGE';
export const WS_USER_ERROR: 'WS_USER_ERROR' = 'WS_USER_ERROR';
export const WS_USER_CLOSE: 'WS_USER_CLOSE' = 'WS_USER_CLOSE';

export interface IWsUserConnect {
    readonly type: typeof WS_USER_CONNECT;
    readonly url: string;
}

export interface IWsUserDisconnect {
    readonly type: typeof WS_USER_DISCONNECT;
}

export interface IWsUserConnecting {
    readonly type: typeof WS_USER_CONNECTING;    
}

export interface IWsUserOpen {
    readonly type: typeof WS_USER_OPEN;
}

export interface IWsUserMessage {
    readonly type: typeof WS_USER_MESSAGE;
    readonly payload: any;
}

export interface IWsUserError {
    readonly type: typeof WS_USER_ERROR;
    readonly payload: string;
}

export interface IWsUserClose {
    readonly type: typeof WS_USER_CLOSE;
}

export const connect = (url: string): IWsUserConnect => ({
    type: WS_USER_CONNECT,
    url,
})

export const disconnect = (): IWsUserDisconnect => ({
    type: WS_USER_DISCONNECT,
})

export type TWebSocketUserActions = 
    IWsUserConnect |
    IWsUserDisconnect |
    IWsUserConnecting |
    IWsUserOpen |
    IWsUserMessage |
    IWsUserError |
    IWsUserClose;