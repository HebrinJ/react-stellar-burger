import { Navigate } from 'react-router-dom';
import LoginPage from '../../pages/login-page';
import MainPage from '../../pages/main-page';
import RegistrationPage from '../../pages/registration-page';
import ForgotPasswordPage from '../../pages/forgot-password-page';
import ProfilePage from '../../pages/profile-page';
import IngredientPage from '../../pages/ingredient-page';
import ResetPasswordPage from '../../pages/reset-password-page';
import OrderDetailsPage from '../../pages/order-details-page';
import { ROOT, LOGIN } from '../../utils/routes';
import FeedPage from '../../pages/feed-page';

type TProtectedRouteProps = {
    element: JSX.Element;
};

export default function ProtectedRouteElement({ element }: TProtectedRouteProps): JSX.Element {

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