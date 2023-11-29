import { Routes, Route, useLocation } from 'react-router-dom';
import LoginPage from '../../pages/loginPage';
import MainPage from '../../pages/mainPage';
import RegistrationPage from '../../pages/registrationPage';
import ForgotPasswordPage from '../../pages/forgotPasswordPage';
import ResetPasswordPage from '../../pages/resetPasswordPage';
import ProfilePage from '../../pages/profilePage';
import IngredientPage from '../../pages/ingredientPage';
import ProtectedRouteElement from '../protected-route/protectedRoute';
import ModalWindow from '../modals/modal-window';
import ModalSetter from '../modals/modal-setter';
import AppHeader from '../app-header/appHeader';
import { ROOT, INGREDIENT, LOGIN, REGISTRATION, FORGOT_PAS, RESET_PAS, PROFILE, FEED, ORDER_NUMBER, FEED_NUMBER } from '../../utils/routes';
import FeedPage from '../../pages/feedPage';
import OrderDetailsPage from '../../pages/orderDetailsPage';
import { ORDERS } from '../../utils/routes';

export default function App() {

  const location = useLocation();
  const background = location.state?.background;

  return ( 
    <Routes>
      <Route path={ROOT} element={<AppHeader />}>
        <Route path={ROOT} element={<ProtectedRouteElement element={<MainPage />} />} />
        <Route path={INGREDIENT} element={ 
            background ? (<MainPage ><ModalWindow ><ModalSetter /></ModalWindow></MainPage>) :
            ( <IngredientPage />) 
          } />
        <Route path={LOGIN} element={<ProtectedRouteElement element={<LoginPage />} />} />
        <Route path={REGISTRATION} element={<ProtectedRouteElement element={<RegistrationPage />} />} />
        <Route path={FORGOT_PAS} element={<ProtectedRouteElement element={<ForgotPasswordPage />} />} />
        <Route path={RESET_PAS} element={<ProtectedRouteElement element={<ResetPasswordPage />} />} />
        <Route path={PROFILE} element={<ProtectedRouteElement element={<ProfilePage />} />} />
        <Route path={FEED} element={<ProtectedRouteElement element={<FeedPage />} />} />
        {[ORDER_NUMBER, FEED_NUMBER].map((path, index) => (
          <Route path={path} element={background ? (<ModalWindow><ModalSetter /></ModalWindow>) : (<OrderDetailsPage />)} key={index} />
        ))}        
        <Route path={ORDERS} element={<ProtectedRouteElement element={<ProfilePage />} />} />
      </Route>
    </Routes>    
  );
}
