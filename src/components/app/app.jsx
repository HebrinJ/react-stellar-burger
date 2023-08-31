import styles from './app.module.css';
import React from 'react';
import AppHeader from '../app-header/appHeader.jsx';
import BurgerIngredients from '../burger-Ingredients/burger-Ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { getData } from '../api.js';
import ModalWindow from '../modals/modal-window';

function App() {
  const [cart, setCart] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [openModal, setModal] = React.useState({visible: false, type: '', selectedProduct: {}});

  React.useEffect(() => {
    setLoading(true);

    getData().then((newData) => {
      setData(newData.data);
      setLoading(false);
    }).catch((err) => console.log(err));
  }, [])

  // Заготовка метода для добавления ингредиентов в конструктор
  function addToCart(event) {
    const id = event.currentTarget.getAttribute('name');
    const selectedProduct = data.find(item => item._id === id);    
    const inCartProduct = cart.find((cartProduct) => {
      return cartProduct.product.id === selectedProduct._id;
      })

    if(selectedProduct.type === 'bun') {
      addBun(selectedProduct);
      return;
    }
    
    if(inCartProduct) {      
      updateQuantity(inCartProduct);
      return;
    }

    addNewProduct(selectedProduct);
  }

  function addNewProduct(selectedProductData) {
    const newProduct = getNewProduct(selectedProductData);
    
    setCart((prevState) => ([
      ...prevState, newProduct      
    ]));
  }

  function updateQuantity(inCartProduct) {
    setCart([
      ...cart.filter(element => element.product.id !== inCartProduct.product.id),
       {...inCartProduct, quantity: inCartProduct.quantity + 1}
    ]);
  }

  function addBun(selectedProductData) {
      const newProduct = getNewProduct(selectedProductData);
      
      setCart([...cart.filter(element => element.product.type !== 'bun'), newProduct]);
  }

  function getNewProduct(data) {
    return {
      product: {
        id: data._id,
        type: data.type,
        price: data.price,
      },
      quantity: 1
    }
  }

  function removeFromCart(productName) {
    const product = data.find(elem => elem.name === productName);
    const selectedProduct = cart.find(elem => elem.product.id === product._id);

    if(selectedProduct.quantity > 1) {
      setCart([
        ...cart.filter(element => element.product.id !== selectedProduct.product.id),
         {...selectedProduct, quantity: selectedProduct.quantity - 1}
      ]);

      return;
    }
    
    setCart([...cart.filter(element => element.product.id !== product._id)]);
  }

  function handleOpenModal(type, selectedProduct) {
    setModal({visible: true, type: type, selectedProduct: selectedProduct});           
  }

  function handleCloseModal() {
    setModal(false);
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
          {openModal.visible && <ModalWindow handleCloseModal={handleCloseModal} type={openModal.type} selectedProduct={openModal.selectedProduct}/>}
          <BurgerIngredients data={data} handleOpenModal={handleOpenModal} cart={cart}/>
          <BurgerConstructor data={data} cart={cart} handleClose={removeFromCart} handleOpenModal={handleOpenModal}/>
        </main>
    </div>
  );
  
}

export default App;
