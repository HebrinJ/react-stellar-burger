import { getData } from "../../utils/api";
import { AppThunk } from "../..";
import { TIngredient } from "../../utils/types-description";

export const LOAD_INGR_DATA: 'LOAD_INGR_DATA' = 'LOAD_INGR_DATA';
export const LOAD_INGR_SUCCESS: 'LOAD_INGR_SUCCESS' = 'LOAD_INGR_SUCCESS';
export const LOAD_INGR_FAILED: 'LOAD_INGR_FAILED' = 'LOAD_INGR_FAILED';

export interface ILoadIngredientData {
  readonly type: typeof LOAD_INGR_DATA,
}

export interface ILoadIngredientSuccess {
  readonly type: typeof LOAD_INGR_SUCCESS,
  readonly data: Array<TIngredient>;
}

export interface ILoadIngredientFailed {
  readonly type: typeof LOAD_INGR_FAILED,
}

export function getIngredientsData() {

    return function(dispatch: AppThunk<Promise<unknown>>) {
        
        dispatch({
            type: LOAD_INGR_DATA
        });
        
        getData().then(res  => {
            
            if (res.success) {
              dispatch({
                type: LOAD_INGR_SUCCESS,
                data: res.data
              })
            } else {
              dispatch({
                type: LOAD_INGR_FAILED
              })
            }
          }).catch( err => {                  
              dispatch({
                type: LOAD_INGR_FAILED
              })
          })
    }
}

export type TLoadActions = ILoadIngredientData | ILoadIngredientSuccess | ILoadIngredientFailed;