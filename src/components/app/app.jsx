import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../../pages/loginPage';
import MainPage from '../../pages/mainPage';
import RegistrationPage from '../../pages/registrationPage';
import ForgotPasswordPage from '../../pages/forgotPasswordPage';
import ResetPasswordPage from '../../pages/resetPasswordPage';
import ProfilePage from '../../pages/profilePage';
import IngredientPage from '../../pages/ingredientPage';
import ProtectedRouteElement from '../protected-route/protectedRoute';

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProtectedRouteElement element={<MainPage />} />} />
        <Route path='/login' element={<ProtectedRouteElement element={<LoginPage />} />} />
        <Route path='/registration' element={<ProtectedRouteElement element={<RegistrationPage />} />} />
        <Route path='/forgot-password' element={<ProtectedRouteElement element={<ForgotPasswordPage />} />} />
        <Route path='/reset-password' element={<ProtectedRouteElement element={<ResetPasswordPage />} />} />
        <Route path='/profile' element={<ProtectedRouteElement element={<ProfilePage />} />} />
        <Route path='/ingredients/:id' element={<ProtectedRouteElement element={<IngredientPage />} /> } />
      </Routes>
    </BrowserRouter>
  );  
}
