import { getOrder, makeOrder } from "../../utils/api";

import { MODAL_ORDER } from "./modal-actions";
import { CLEAR_CART } from "./cart-actions";

import { AppDispatch, AppThunk } from "../..";
import { TOrderData, TOrderDetails } from "../../utils/types-description";
import { handleError } from "../../utils/handleError";

export const GET_ORDER_DATA: 'GET_ORDER_DATA' = 'GET_ORDER_DATA';
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED: 'GET_ORDER_FAILED' = 'GET_ORDER_FAILED';
export const GET_ORDER_DETAILS: 'GET_ORDER_DETAILS' = 'GET_ORDER_DETAILS';
export const DETAILS_READY: 'DETAILS_READY' = 'DETAILS_READY';
export const RESET_DETAILS: 'RESET_DETAILS' = 'RESET_DETAILS';

export interface IGetOrderData {
  readonly type: typeof GET_ORDER_DATA,
}

export interface IGetOrderSuccess {
  readonly type: typeof GET_ORDER_SUCCESS,
  payload: TOrderData;
}

export interface IGetOrderFailed {
  readonly type: typeof GET_ORDER_FAILED,
}

export interface IGetOrderDetails {
  readonly type: typeof GET_ORDER_DETAILS,
  payload: Array<TOrderDetails>;
}

export interface IDetailsReady {
  readonly type: typeof DETAILS_READY,
}

export interface IResetDetails {
  readonly type: typeof RESET_DETAILS,
}

export function getOrderData(orderProducts: ReadonlyArray<string>) {
    return function(dispatch: AppDispatch) {

        dispatch({
            type: GET_ORDER_DATA
        });        

        makeOrder(orderProducts).then(res  => {
          
            if (res) {                                    
              dispatch({
                type: GET_ORDER_SUCCESS,
                payload: res,
            });
                dispatch({
                type: MODAL_ORDER,
                payload: res.order!.number,
            });
              dispatch({
                type: CLEAR_CART,
            })
          }
        }).catch( err => {                  
          dispatch({
            type: GET_ORDER_FAILED,
          })
          handleError(err);
        })          
    }
}

export type TOrderActions = IGetOrderData |
  IGetOrderSuccess |
  IGetOrderFailed |
  IGetOrderDetails |
  IDetailsReady |
  IResetDetails;