import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoginPage from '../../pages/loginPage';
import MainPage from '../../pages/mainPage';
import RegistrationPage from '../../pages/registrationPage';
import ForgotPasswordPage from '../../pages/forgotPasswordPage';
import ProfilePage from '../../pages/profilePage';
import IngredientPage from '../../pages/ingredientPage';
import ResetPasswordPage from '../../pages/resetPasswordPage';
import { getUserData } from '../../utils/api';

export default function ProtectedRouteElement({ element }) {

    const isLogin = localStorage.getItem('accessToken');

    switch (element.type) {
        case MainPage:
            return element;
        case LoginPage:
        case RegistrationPage:
        case ForgotPasswordPage:
        case ResetPasswordPage:
            return isLogin ? <Navigate to="/" replace /> : element;
        case ProfilePage:
        case IngredientPage:
            return isLogin ? element : <Navigate to="/login" replace />;
        default:
            return isLogin ? element : <Navigate to="/login" replace />;;
    }

    // if(isLogin && element.type !== LoginPage && element.type !== RegistrationPage) {
    //     return element
    // } else if(!isLogin) {
    //     return <Navigate to="/login" replace />
    // } else {
    //     return <Navigate to="/" replace />;
    // }

    //return isLogin ? element : <Navigate to="/login" replace />;
}