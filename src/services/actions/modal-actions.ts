export const MODAL_ORDER: 'MODAL_ORDER' = 'MODAL_ORDER';
export const MODAL_INGR_INFO: 'MODAL_INGR_INFO' = 'MODAL_INGR_INFO';
export const MODAL_LOADING_ERROR: 'MODAL_LOADING_ERROR' = 'MODAL_LOADING_ERROR';
export const MODAL_ORDER_INFO: 'MODAL_ORDER_INFO' = 'MODAL_ORDER_INFO';
export const MODAL_CLOSE: 'MODAL_CLOSE' = 'MODAL_CLOSE';

export interface IModalOrder {
    readonly type: typeof MODAL_ORDER;
    data: object;
}

export interface IModalIngredientInfo {
    readonly type: typeof MODAL_INGR_INFO;
    data: object;
}

export interface IModalLoadingError {
    readonly type: typeof MODAL_LOADING_ERROR;
    data: object;
}

export interface IModalOrderInfo {
    readonly type: typeof MODAL_ORDER_INFO;
    data: object;
}

export interface IModalClose {
    readonly type: typeof MODAL_CLOSE;
}

export type TModalActions = IModalOrder |
    IModalIngredientInfo |
    IModalLoadingError |
    IModalOrderInfo |
    IModalClose;