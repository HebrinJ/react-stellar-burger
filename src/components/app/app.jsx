import styles from './app.module.css';
import React from 'react';
import AppHeader from '../app-header/appHeader.jsx';
import BurgerIngredients from '../burger-Ingredients/burger-Ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { getData } from '../api.js';
import ModalWindow from '../modals/modal-window';

import IngredientDetails from '../modals/types/ingredient-details';
import OrderDetails from '../modals/types/order-details';
import LoadingError from '../modals/types/loading-error';

import { OrderContext } from './order-context';
import { DataContext } from './data-context';

import cartReducer from './cart-reducer';

function App() {
  const initialState = {bun: null, ingredients: []}

  const [cart, dispatch] = React.useReducer(cartReducer, initialState);
  
  const [data, setData] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [openModal, setModal] = React.useState({visible: false, type: {}, selectedProduct: {}});
  const [loadingError, setError] = React.useState({isError: false, errorText: ''});

  React.useEffect(() => {
    setLoading(true);

    getData().then((newData) => {
      setData(newData.data);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
      setError(true, err);
    });
  }, [])

  
  function addToCart(event) {
    const id = event.currentTarget.getAttribute('name');
    const selectedProduct = data.find(item => item._id === id);

    if(selectedProduct.type === 'bun') {
        dispatch({
          type: 'addBun',
          payload: id,
        })
        return;
    }
    
    dispatch({
      type: 'add',
      payload: id,
    })
  }

  function removeFromCart(ingredientName) {
    const ingredient = data.find(elem => elem.name === ingredientName);    
    const id = ingredient._id;

    dispatch({
      type: 'remove',
      payload: id,
    })
  }

  function handleOpenModal(type, selectedProduct) {
    setModal({visible: true, type: type, selectedProduct: selectedProduct});           
  }

  function handleCloseModal() {
    setModal(false);
  }

  function getModal(type) {
    let modalTypeMarkup = null;

    switch (type) {
      case 'order':
          modalTypeMarkup = <OrderDetails />
          break;
      case 'info':
          modalTypeMarkup = <IngredientDetails details={openModal.selectedProduct} label='Детали ингридиента'/>
          break;
      case 'loadingError':
          modalTypeMarkup = <LoadingError errorText={loadingError.errorText} label='Ошибка загрузки'/>
      default:
        console.log('Модальное окно не найдено');
        break;        
  }

    return modalTypeMarkup;
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
          {loadingError.isError && <ModalWindow handleCloseModal={handleCloseModal} markup={getModal('loadingError')} />}
          {openModal.visible && <ModalWindow handleCloseModal={handleCloseModal} markup={getModal(openModal.type)} />}
          <OrderContext.Provider value={cart}>
            <DataContext.Provider value={data}>
              <BurgerIngredients handleOpenModal={handleOpenModal} handleAddToCart={addToCart} />
              <BurgerConstructor data={data} cart={cart} handleClose={removeFromCart} handleOpenModal={handleOpenModal}/>
            </DataContext.Provider>
          </OrderContext.Provider>
        </main>
    </div>
  );
  
}

export default App;
