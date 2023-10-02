import { getData } from "../../components/api";

export const LOAD_INGR_DATA = 'LOAD_INGR_DATA';
export const LOAD_INGR_SUCCESS = 'LOAD_INGR_SUCCESS';
export const LOAD_INGR_FAILED = 'LOAD_INGR_FAILED';

export function getIngredientsData() {
    return function(dispatch) {

        dispatch({
            type: LOAD_INGR_DATA
        });

        getData().then(res  => {
          
            if (res) {                                    
              dispatch({
                type: LOAD_INGR_SUCCESS,
                payload: res.data
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