import { TOrderLoadingError, TOrderSettings } from "../reducers/modal-reducer";
import { TIngredient } from "../../utils/typesDescription";
import { TOrderData } from "../../utils/typesDescription";

export const MODAL_ORDER: 'MODAL_ORDER' = 'MODAL_ORDER';
export const MODAL_INGR_INFO: 'MODAL_INGR_INFO' = 'MODAL_INGR_INFO';
export const MODAL_LOADING_ERROR: 'MODAL_LOADING_ERROR' = 'MODAL_LOADING_ERROR';
export const MODAL_ORDER_INFO: 'MODAL_ORDER_INFO' = 'MODAL_ORDER_INFO';
export const MODAL_CLOSE: 'MODAL_CLOSE' = 'MODAL_CLOSE';

export interface IModalOrder {
    readonly type: typeof MODAL_ORDER;
    payload: TOrderSettings;
}

export interface IModalIngredientInfo {
    readonly type: typeof MODAL_INGR_INFO;
    payload: TIngredient;
}

export interface IModalLoadingError {
    readonly type: typeof MODAL_LOADING_ERROR;
    payload: TOrderLoadingError;
}

export interface IModalOrderInfo {
    readonly type: typeof MODAL_ORDER_INFO;
    payload: TOrderData;
}

export interface IModalClose {
    readonly type: typeof MODAL_CLOSE;
}

export type TModalActions = IModalOrder |
    IModalIngredientInfo |
    IModalLoadingError |
    IModalOrderInfo |
    IModalClose;