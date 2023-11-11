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

export default function App() {

  const location = useLocation();
  const background = location.state?.background;

  return ( 
    <Routes>
      <Route path='/' element={<AppHeader />}>
        <Route path='/' element={<ProtectedRouteElement element={<MainPage />} />} />
        <Route path='ingredients/:id' element={ 
            background ? (<MainPage ><ModalWindow ><ModalSetter /></ModalWindow></MainPage>) :
            ( <IngredientPage />) 
          } />
        <Route path='login' element={<ProtectedRouteElement element={<LoginPage />} />} />
        <Route path='registration' element={<ProtectedRouteElement element={<RegistrationPage />} />} />
        <Route path='forgot-password' element={<ProtectedRouteElement element={<ForgotPasswordPage />} />} />
        <Route path='reset-password' element={<ProtectedRouteElement element={<ResetPasswordPage />} />} />
        <Route path='profile' element={<ProtectedRouteElement element={<ProfilePage />} />} />
      </Route>
    </Routes>    
  );
}
