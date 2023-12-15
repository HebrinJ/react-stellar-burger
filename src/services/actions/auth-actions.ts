import { AppThunk } from "../..";
import { authorization, getUserData, logout, registration, updateUserData } from "../../utils/api";

export const SIGNIN: 'SIGNIN' = 'SIGNIN';
export const LOGOUT: 'LOGOUT' = 'LOGOUT';
export const REGISTER: 'REGISTER' = 'REGISTER';
export const GETUSER: 'GETUSER' = 'GETUSER';
export const UPDATE_USER: 'UPDATE_USER' = 'UPDATE_USER';

export interface ISingIn {
    readonly type: typeof SIGNIN;
    readonly payload: any;
}

export interface IRegister {
    readonly type: typeof REGISTER;
    readonly payload: any;
}

export interface ILogout {
    readonly type: typeof LOGOUT;    
}

export interface IGetUser {
    readonly type: typeof GETUSER;
    readonly payload: any;
}

export interface IUpdateUser {
    readonly type: typeof UPDATE_USER;
    readonly payload: any;
}

export function registrationUser(email: string, password: string, userName: string) {
    return function(dispatch: AppThunk<Promise<unknown>>) {
        
        registration(email, password, userName)
        .then(res => {
            if(res) {
                dispatch({
                    type: REGISTER,
                    userData: res,
                })
            }
        })
    }
}

// export const registrationUser: AppThunk = (email: string, password: string, userName: string) => 
// (dispatch) => {
    
//     registration(email, password, userName)
//     .then(res => {
//         if(res) {
//             dispatch({
//                 type: SIGNIN,
//                 userData: res,
//             })
//         }
//     })
// }; 

export function signinUser(email: string, password: string) {
    return function(dispatch: AppThunk<Promise<unknown>>) {

        authorization(email, password)
        .then(res => {
            if(res) {
                dispatch({
                    type: SIGNIN,
                    payload: res,
                })
            }
        })
    }
}

export function logoutUser() {
    return function(dispatch: AppThunk<Promise<unknown>>) {

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
    return function(dispatch: AppThunk<Promise<unknown>>) {

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

export function updateUser(email: string, userName: string, password: string) {
    return function(dispatch: AppThunk<Promise<unknown>>) {

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

export type TAuthActions = ISingIn | IRegister | ILogout | IUpdateUser | IGetUser;