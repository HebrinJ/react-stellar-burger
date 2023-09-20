import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/appHeader.jsx';
import BurgerIngredients from '../burger-Ingredients/burger-Ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { getData, makeOrder } from '../api.js';
import ModalWindow from '../modals/modal-window';

import { OrderContext } from './order-context';
import { DataContext } from './data-context';

import cartReducer from './cart-reducer';
import modalReducer from './modal-reducer';

function App() {
  const initialCartState = {bun: null, ingredients: []};
  const initialModalState = {visible: false, type: '', modalData: {}};

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

  
  function addToCart(event) {
    const id = event.currentTarget.getAttribute('name');
    const selectedProduct = data.find(item => item._id === id);

    if(selectedProduct.type === 'bun') {
        cartDispatch({
          type: 'addBun',
          payload: id,
        })
        return;
    }
    
    cartDispatch({
      type: 'add',
      payload: id,
    })
  }

  function removeFromCart(ingredientName) {
    const ingredient = data.find(elem => elem.name === ingredientName);    
    const id = ingredient._id;

    cartDispatch({
      type: 'remove',
      payload: id,
    })
  }

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
          {loadingError.isError && <ModalWindow handleCloseModal={handleCloseModal} modal={modal}/>}
          {modal.visible && <ModalWindow handleCloseModal={handleCloseModal} modal={modal} />}
          <OrderContext.Provider value={cart}>
            <DataContext.Provider value={data}>
              <BurgerIngredients handleOpenModal={handleOpenModal} handleAddToCart={addToCart} />
              <BurgerConstructor handleClose={removeFromCart} handleOrder={handleOrder}/>
            </DataContext.Provider>
          </OrderContext.Provider>
        </main>
    </div>
  );
  
}

export default App;
