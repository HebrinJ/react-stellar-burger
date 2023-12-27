import { AppDispatch } from "../..";
import { TAuthorization, TRegister, TUserData, authorization, getUserData, logout, registration, updateUserData } from "../../utils/api";
import { handleError } from "../../utils/handleError";

export const SIGNIN: 'SIGNIN' = 'SIGNIN';
export const LOGOUT: 'LOGOUT' = 'LOGOUT';
export const REGISTER: 'REGISTER' = 'REGISTER';
export const GETUSER: 'GETUSER' = 'GETUSER';
export const UPDATE_USER: 'UPDATE_USER' = 'UPDATE_USER';

export interface ISingIn {
    readonly type: typeof SIGNIN;
    readonly payload: TAuthorization;
}

export interface IRegister {
    readonly type: typeof REGISTER;
    readonly payload: TRegister;
}

export interface ILogout {
    readonly type: typeof LOGOUT;    
}

export interface IGetUser {
    readonly type: typeof GETUSER;
    readonly payload: TUserData;
}

export interface IUpdateUser {
    readonly type: typeof UPDATE_USER;
    readonly payload: TUserData;
}

export function registrationUser(email: string, password: string, userName: string) {
    return function(dispatch: AppDispatch) {
        
        registration(email, password, userName)
        .then(res => {
            if(res) {
                dispatch({
                    type: REGISTER,
                    payload: res,
                })
            }
        })
        .catch( err => {
            handleError(err);
        })
    }
}

export function signinUser(email: string, password: string) {
    return function(dispatch: AppDispatch) {

        authorization(email, password)
        .then(res => {
            if(res) {
                dispatch({
                    type: SIGNIN,
                    payload: res,
                })
            }
        })
        .catch( err => {
            handleError(err);
        })
    }
}

export function logoutUser() {
    return function(dispatch: AppDispatch) {

        logout().then(res => {
            if(res) {
                dispatch({
                    type: LOGOUT,
                })
            }
        })
        .catch( err => {
            handleError(err);
        });
    }
}

export function getUser() {
    return function(dispatch: AppDispatch) {

        getUserData().then(res => {
            if(res) {
                dispatch({
                    type: GETUSER,
                    payload: res,
                })
            }
        })
        .catch( err => {
            handleError(err);
        })
    }
}

export function updateUser(email: string, userName: string, password: string) {
    return function(dispatch: AppDispatch) {

        updateUserData(email, userName, password).then(res => {
            if(res) {
                dispatch({
                    type: UPDATE_USER,
                    payload: res,
                })
            }
        })
        .catch( err => {
            handleError(err);
        })
    }
}

export type TAuthActions = ISingIn | IRegister | ILogout | IUpdateUser | IGetUser;