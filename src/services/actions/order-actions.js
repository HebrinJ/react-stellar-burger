import { useSelector } from "react-redux";
import { getOrder, makeOrder } from "../../utils/api";

import { MODAL_ORDER } from "./modal-actions";
import { CLEAR_CART } from "./cart-actions";

export const GET_ORDER_DATA = 'GET_ORDER_DATA';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const GET_ORDER_DETAILS = 'GET_ORDER_DETAILS';
export const DETAILS_READY = 'DETAILS_READY';

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
              dispatch({
                type: CLEAR_CART,
              })

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

export function getOrderDetails(number) {
  return function(dispatch) {
    getOrder(number).then(res => {
      if(res) {        
        dispatch({
          type: GET_ORDER_DETAILS,
          payload: res.orders
        });

        dispatch({
          type: DETAILS_READY,
        })
      }
    }).catch( err => {                  
      dispatch({
        type: GET_ORDER_FAILED,
      })
    })      
  }
}