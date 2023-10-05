import React from 'react';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from './app.module.css';
import AppHeader from '../app-header/appHeader.jsx';
import BurgerIngredients from '../burger-Ingredients/burger-Ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import ModalWindow from '../modals/modal-window';

import ModalSetter from '../modals/modal-setter';
import { getIngredientsData } from '../../services/actions/loading-actions';
import { useSelector, useDispatch } from 'react-redux';



function App() {

  const dispatch = useDispatch();
  const modal = useSelector(state => state.modal);
  const loading = useSelector(state => state.loading);

    React.useEffect(() => {
    dispatch(getIngredientsData());    
  }, []) 
 

  if(loading.isLoading) {
    return (
      <div className={styles.app}>
          <AppHeader />
          <main className={styles.content}>
            
          </main>
      </div>
    );
  }

  return (
    <div className={styles.app}>        
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

export default App;
