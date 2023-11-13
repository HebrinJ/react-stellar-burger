import { authorization, getUserData, logout, registration, updateUserData } from "../../utils/api";

export const SIGNIN = 'SIGNIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';
export const GETUSER = 'GETUSER';
export const UPDATE_USER = 'UPDATE_USER';

export function userRegistration(email, password, userName) {
    return function(dispatch) {

        registration(email, password, userName).then(res => {
            if(res) {
                dispatch({
                    type: REGISTER,
                    payload: res,
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

export function getUser() {
    return function(dispatch) {

        getUserData().then(res => {
            if(res) {
                dispatch({
                    type: GETUSER,
                    payload: res,
                })
            }
        })
    }
}

export function updateUser(email, userName, password) {
    return function(dispatch) {

        updateUserData(email, userName, password).then(res => {
            if(res) {
                dispatch({
                    type: UPDATE_USER,
                    payload: res,
                })
            }
        })
    }
}