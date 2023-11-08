import { Routes, Route } from 'react-router-dom';
import LoginPage from '../../pages/loginPage';
import MainPage from '../../pages/mainPage';
import RegistrationPage from '../../pages/registrationPage';
import ForgotPasswordPage from '../../pages/forgotPasswordPage';
import ResetPasswordPage from '../../pages/resetPasswordPage';
import ProfilePage from '../../pages/profilePage';
import IngredientPage from '../../pages/ingredientPage';
import ProtectedRouteElement from '../protected-route/protectedRoute';
import { useSelector } from 'react-redux';
import ModalWindow from '../modals/modal-window';
import ModalSetter from '../modals/modal-setter';
import AppHeader from '../app-header/appHeader';

export default function App() {  
  
  const isRoot = useSelector(state => state.route.route);
  const isModalOpen = localStorage.getItem('ingrOpen');

  let isOpenFromRoot = isRoot === 'root' ? false : true

  return (
    
      <Routes>
        <Route path='/' element={<AppHeader />}>
          <Route path='/' element={<ProtectedRouteElement element={<MainPage />} />} />
          <Route path='ingredients/:id' element={ 
            isOpenFromRoot && !isModalOpen ? 
            ( <IngredientPage />) : 
            (<MainPage ><ModalWindow ><ModalSetter /></ModalWindow></MainPage>) 
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
