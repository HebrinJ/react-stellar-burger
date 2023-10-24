import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../../pages/loginPage';
import MainPage from '../../pages/mainPage';

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/forgot-password' element={<LoginPage />} />
        <Route path='/reset-password' element={<LoginPage />} />
        <Route path='/profile' element={<LoginPage />} />
        <Route path='/ingredients/:id' element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );  
}
