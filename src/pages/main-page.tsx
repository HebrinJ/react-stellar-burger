import React, { ReactNode } from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from './main-page.module.css';
import BurgerIngredients from '../components/burger-Ingredients/burger-Ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import { getIngredientsData } from '../services/actions/loading-actions';
import { Outlet } from 'react-router-dom';
import ModalWindow from '../components/modals/modal-window';
import { useDispatch, useSelector } from '../utils/hooks';
import OrderAccept from '../components/modals/types/order-accept';
import { MODAL_CLOSE } from '../services/actions/modal-actions';

type TMainPageProps = { children?: ReactNode | undefined; };

export default function MainPage({children}: TMainPageProps): JSX.Element {

  const openModal = useSelector(state => state.modal.visible)
  const ingredients = useSelector(state => state.loading.allIngredients)

  const dispatch = useDispatch();

  React.useEffect(() => {
      
      if(ingredients.length === 0) {
        dispatch(getIngredientsData());
      }
  }, [])

  function closeOrderModal() {
    dispatch({type: MODAL_CLOSE})
  }

  return (
      <div className={styles.main}>
          { openModal && <ModalWindow onClose={closeOrderModal}><OrderAccept /></ModalWindow>}
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
