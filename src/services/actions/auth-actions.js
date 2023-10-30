import { func } from "prop-types";
import { authorization, logout, registration } from "../../utils/api";

export const SIGNIN = 'SIGNIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';

export function userRegistration(email, password, userName) {
    return function(dispatch) {

        registration(email, password, userName).then(res => {
            if(res) {
                dispatch({
                    type: REGISTER,
                    payload: res.data,
                })
            }
        })
    }
}

export function userSignin(email, password) {
    return function(dispatch) {

        authorization(email, password).then(res => {
            if(res) {
                dispatch({
                    type: SIGNIN,
                    payload: res,
                })                
            }
        })
    }
}

export function userLogout() {
    return function(dispatch) {

        logout().then(res => {
            if(res) {
                dispatch({
                    type: LOGOUT,
                })
            }
        });
    }
}