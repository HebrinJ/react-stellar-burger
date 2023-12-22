import { TConstructIngredient, TDragIndexes } from "../reducers/cart-reducer";

export const ADD_BUN: 'ADD_BUN' = 'ADD_BUN';
export const ADD_INGR: 'ADD_INGR' = 'ADD_INGR';
export const REMOVE_INGR: 'REMOVE_INGR' = 'REMOVE_INGR';
export const CLEAR_CART: 'CLEAR_CART' = 'CLEAR_CART';
export const MOVE_INGR: 'MOVE_INGR' = 'MOVE_INGR';
export const STOP_MOVE: 'STOP_MOVE' = 'STOP_MOVE';

export interface IAddBun {
    readonly type: typeof ADD_BUN;
    readonly payload: TConstructIngredient;
}

export interface IAddIngredient {
    readonly type: typeof ADD_INGR;
    readonly payload: TConstructIngredient;
}

export interface IRemoveIngredient {
    readonly type: typeof REMOVE_INGR;
    readonly payload: string;
}

export interface IClearCart {
    readonly type: typeof CLEAR_CART;
}

export interface IMoveIngredient {
    readonly type: typeof MOVE_INGR;
    readonly payload: TDragIndexes
}

export interface IStopMove {
    readonly type: typeof STOP_MOVE;
}

export type TCartActions = IAddBun |
    IAddIngredient |
    IRemoveIngredient |
    IClearCart |
    IMoveIngredient |
    IStopMove;