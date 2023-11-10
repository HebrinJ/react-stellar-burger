import { Navigate } from 'react-router-dom';
import LoginPage from '../../pages/loginPage';
import MainPage from '../../pages/mainPage';
import RegistrationPage from '../../pages/registrationPage';
import ForgotPasswordPage from '../../pages/forgotPasswordPage';
import ProfilePage from '../../pages/profilePage';
import IngredientPage from '../../pages/ingredientPage';
import ResetPasswordPage from '../../pages/resetPasswordPage';
import React from 'react';
import { useSelector } from 'react-redux';

export default function ProtectedRouteElement({ element }) {

    const [isLogin, setLogin] = React.useState(false);
    const loginState = useSelector(state => state.auth.success)

    React.useEffect(() => {
        setLogin(localStorage.getItem('accessToken'));
    }, [loginState])

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
}