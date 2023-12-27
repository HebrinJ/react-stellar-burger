import { TIngredient } from "../../utils/types-description";

export const SELECT_ITEM: 'SELECT_ITEM' = 'SELECT_ITEM';
export const UNSELECT: 'UNSELECT' = 'UNSELECT';

export interface ISelectItem {
    readonly type: typeof SELECT_ITEM,
    payload: TIngredient,
}

export interface IUnselect {
    readonly type: typeof UNSELECT,
}

export type TSelectedActions = ISelectItem | IUnselect;