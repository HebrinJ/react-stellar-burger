import { useSelector } from "react-redux";
import { makeOrder } from "../../utils/api";

import { MODAL_ORDER } from "./modal-actions";

export const GET_ORDER_DATA = 'GET_ORDER_DATA';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export function getOrderData(orderProducts) {
    return function(dispatch) {

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
                payload: res.order.number,
            });

            } else {
              dispatch({
                type: GET_ORDER_FAILED,
              })
            }
          }).catch( err => {                  
              dispatch({
                type: GET_ORDER_FAILED,
              })
          })          
          
    }
}