import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/appHeader.jsx';
import BurgerIngredients from '../burger-Ingredients/burger-Ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { getData, makeOrder } from '../api.js';
import ModalWindow from '../modals/modal-window';

import { OrderContext } from '../../contexts/order-context';
import { IngredientDataContext } from '../../contexts/ingredient-data-context';

import cartReducer from '../../services/reducers/cart-reducer';
import modalReducer from '../../services/reducers/modal-reducer';

import ModalSetter from '../modals/modal-setter';
import { rootReducer } from '../../services/reducers/root-reducer';
import thunk from 'redux-thunk';
import { getIngredientsData } from '../../services/actions/loading-actions';
import { useSelector, useDispatch } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

function App() {
  //const initialCartState = {bun: null, ingredients: []};
  //const initialModalState = {visible: false, type: '', modalSettings: {}};

  const initialState = {
    allIngredients: [],
    isLoading: false,
    isError: false,
    cartIngredients: {
      bun: null,
      ingredients: [],
    },
    currentIngredient: {},
    order: {},
    modal: {
      visible: false, 
      type: '',
      modalSettings: {},
    }
  }

  //const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

  const dispatch = useDispatch();
  const modal = useSelector(state => state.modal);
  const loading = useSelector(state => state.loading);

  //const [cart, cartDispatch] = React.useReducer(cartReducer, initialCartState);
  
  //const [modal, modalDispatch] = React.useReducer(modalReducer, initialModalState)
  
  //const [data, setData] = React.useState([]);
  //const [isLoading, setLoading] = React.useState(true);
  //const [loadingError, setError] = React.useState({isError: false, errorText: ''});

  // React.useEffect(() => {
  //   setLoading(true);

  //   getData().then((newData) => {
  //     setData(newData.data);
  //     setLoading(false);
  //   }).catch((err) => {
  //     console.log(err);
  //     setError(true, err);
  //     modalDispatch({
  //       type: 'loadingError',
  //       payload: {error: err},
  //     })
  //   });
  // }, [])

  React.useEffect(() => {
    dispatch(getIngredientsData());    
  }, []) 

  function handleOrder() {
    // makeOrder(cart.ingredients).then((order) => {      
    //   handleOpenModal('order', {orderNum: order.order.number});
    // }).catch((err) => {
    //   console.log(err);
    // });
  }

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
        <main className={styles.content}>
          {loading.isError && <ModalWindow><ModalSetter /></ModalWindow>}
          {modal.visible && <ModalWindow><ModalSetter /></ModalWindow>}          
              <BurgerIngredients />
              <BurgerConstructor handleOrder={handleOrder}/>
        </main>        
    </div>
  );
  
}

export default App;
