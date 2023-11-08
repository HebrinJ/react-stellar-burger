import React from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from './mainPage.module.css';
import AppHeader from '../components/app-header/appHeader.jsx';
import BurgerIngredients from '../components/burger-Ingredients/burger-Ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import ModalWindow from '../components/modals/modal-window';
import ModalSetter from '../components/modals/modal-setter';
import { getIngredientsData } from '../services/actions/loading-actions';
import { useSelector, useDispatch } from 'react-redux';
import { getUser, refreshAccess } from '../services/actions/auth-actions';
import { BrowserRouter, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import IngredientPage from './ingredientPage';
import ProtectedRouteElement from '../components/protected-route/protectedRoute';

export default function MainPage(props) {

  const dispatch = useDispatch();

    React.useEffect(() => {
      dispatch(getIngredientsData());
  }, [])    

  return (
      <div className={styles.main}>
          
          <DndProvider backend={HTML5Backend}>        
          <main className={styles.content}>            
            <Outlet />
            {props.children}
                <BurgerIngredients />
                <BurgerConstructor />
          </main> 
          </DndProvider>       
      </div>
  );  
}
