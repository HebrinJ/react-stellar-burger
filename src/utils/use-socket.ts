export enum TWebSocketStatus {
    CONNECTING,
    ONLINE,
    OFFLINE,
};

export type TWebSocketState = {
    status: TWebSocketStatus;
    data: TOrdersData | null;
    error: string | null;
};

export type TOrdersData = {
    orders: Array<TOrder>;
    success: boolean;
    total: number;
    totalToday: number;
};

export type TOrder = {
    _id: string;
    ingredients: Array<string>;
    status: '' | 'done' | 'pending' | 'created';
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
};