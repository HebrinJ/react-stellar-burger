import React from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from './mainPage.module.css';
import BurgerIngredients from '../components/burger-Ingredients/burger-Ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import { getIngredientsData } from '../services/actions/loading-actions';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import ModalWindow from '../components/modals/modal-window';
import ModalSetter from '../components/modals/modal-setter';


export default function MainPage(props) {

  const openModal = useSelector(state => state.modal.visible)
  const ingredients = useSelector(state =>  state.loading.allIngredients)

  const dispatch = useDispatch();

    React.useEffect(() => {

      if(ingredients.length === 0) {        
        dispatch(getIngredientsData());
      }
      
  }, [])    

  return (
      <div className={styles.main}>
          { openModal && <ModalWindow><ModalSetter /></ModalWindow>}
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
