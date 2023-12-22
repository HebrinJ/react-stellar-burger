import React, { ReactNode } from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from './main-page.module.css';
import BurgerIngredients from '../components/burger-Ingredients/burger-Ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import { getIngredientsData } from '../services/actions/loading-actions';
import { Outlet } from 'react-router-dom';
import ModalWindow from '../components/modals/modal-window';
import ModalSetter from '../components/modals/modal-setter';
import { useDispatch, useSelector } from '../utils/hooks';

type TMaimPageProps = { children?: ReactNode | undefined; };

export default function MainPage({children}: TMaimPageProps): JSX.Element {

  const openModal = useSelector(state => state.modal.visible)
  const ingredients = useSelector(state => state.loading.allIngredients)

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
            {children}
                <BurgerIngredients />
                <BurgerConstructor />
          </main> 
          </DndProvider>       
      </div>
  );  
}
