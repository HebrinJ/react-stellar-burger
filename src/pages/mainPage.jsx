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

export default function MainPage() {

  const dispatch = useDispatch();
  const modal = useSelector(state => state.modal);
  const loading = useSelector(state => state.loading);

    React.useEffect(() => {
      dispatch(getIngredientsData());

      // if(localStorage.getItem('accessToken')) {
      //   dispatch(refreshAccess());
      // }
  }, []) 
 

  if(loading.isLoading) {
    return (
      <div className={styles.main}>
          <AppHeader />
          <main className={styles.content}>
            
          </main>
      </div>
    );
  }

  return (
      <div className={styles.main}>        
          <AppHeader />
          <DndProvider backend={HTML5Backend}>        
          <main className={styles.content}>
            {loading.isError && <ModalWindow><ModalSetter /></ModalWindow>}
            {modal.visible && <ModalWindow><ModalSetter /></ModalWindow>}          
                <BurgerIngredients />
                <BurgerConstructor />
          </main> 
          </DndProvider>       
      </div>
  );  
}
