import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/appHeader.jsx';
import BurgerIngredients from '../burger-Ingredients/burger-Ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { getData, makeOrder } from '../api.js';
import ModalWindow from '../modals/modal-window';

import { OrderContext } from '../../contexts/order-context';
import { IngredientDataContext } from '../../contexts/ingredient-data-context';

import cartReducer from '../../contexts/cart-reducer';
import modalReducer from '../../contexts/modal-reducer';

import ModalSetter from '../modals/modal-setter';

function App() {
  const initialCartState = {bun: null, ingredients: []};
  const initialModalState = {visible: false, type: '', modalSettings: {}};

  const [cart, cartDispatch] = React.useReducer(cartReducer, initialCartState);
  const [modal, modalDispatch] = React.useReducer(modalReducer, initialModalState)
  
  const [data, setData] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [loadingError, setError] = React.useState({isError: false, errorText: ''});

  React.useEffect(() => {
    setLoading(true);

    getData().then((newData) => {
      setData(newData.data);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
      setError(true, err);
      modalDispatch({
        type: 'loadingError',
        payload: {error: err},
      })
    });
  }, [])

  function handleOpenModal(type, modalDataObject) {
    modalDispatch({
      type: type,
      payload: modalDataObject,
    })
  }

  function handleCloseModal() {
    modalDispatch({
      type: 'close',
      payload: {},
    })
  }

  function handleOrder() {
    makeOrder(cart.ingredients).then((order) => {      
      handleOpenModal('order', {orderNum: order.order.number});
    }).catch((err) => {
      console.log(err);
    });
  }

  if(isLoading) {
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
        <main className={styles.content}>
          {loadingError.isError && <ModalWindow handleCloseModal={handleCloseModal} ><ModalSetter modal={modal} /></ModalWindow>}
          {modal.visible && <ModalWindow handleCloseModal={handleCloseModal} ><ModalSetter modal={modal} /></ModalWindow>}
          <OrderContext.Provider value={{cart: cart, cartDispatch}}>
            <IngredientDataContext.Provider value={data}>
              <BurgerIngredients handleOpenModal={handleOpenModal} />
              <BurgerConstructor handleOrder={handleOrder}/>
            </IngredientDataContext.Provider>
          </OrderContext.Provider>
        </main>
    </div>
  );
  
}

export default App;
