import { Navigate } from 'react-router-dom';
import LoginPage from '../../pages/loginPage';
import MainPage from '../../pages/mainPage';
import RegistrationPage from '../../pages/registrationPage';
import ForgotPasswordPage from '../../pages/forgotPasswordPage';
import ProfilePage from '../../pages/profilePage';
import IngredientPage from '../../pages/ingredientPage';
import ResetPasswordPage from '../../pages/resetPasswordPage';
import OrderDetailsPage from '../../pages/orderDetailsPage';
import React from 'react';
import { useSelector } from 'react-redux';
import { ROOT, LOGIN } from '../../utils/routes';
import FeedPage from '../../pages/feedPage';

export default function ProtectedRouteElement({ element }) {

    const isLogin = !!localStorage.getItem('accessToken');

    switch (element.type) {
        case MainPage:
        case FeedPage:
        case IngredientPage:
        case OrderDetailsPage:
            return element;
        case LoginPage:
        case RegistrationPage:
        case ForgotPasswordPage:
        case ResetPasswordPage:            
            return isLogin ? <Navigate to={ROOT} replace /> : element;
        case ProfilePage:
            return isLogin ? element : <Navigate to={LOGIN} replace />;
        default:
            return isLogin ? element : <Navigate to={LOGIN} replace />;;
    }
}