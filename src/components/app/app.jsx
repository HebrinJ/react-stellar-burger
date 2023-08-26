import styles from "./app.module.css";
import React from "react";
import { data } from "../../utils/data";
import AppHeader from "../app-header/appHeader.jsx";
import BurgerIngredients from "../burger-Ingredients/burger-Ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor"

function App() {
  const [cart, setCart] = React.useState([]);

  function addToCart(event) {
    const id = event.currentTarget.id;
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
      
      setCart([
        ...cart.filter(element => element.product.type !== 'bun'), newProduct
      ])
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
    const product = data.find(elem => elem.name === productName)
    const selectedProduct = cart.find(elem => elem.product.id === product._id)

    if(selectedProduct.quantity > 1) {
      setCart([
        ...cart.filter(element => element.product.id !== selectedProduct.product.id),
         {...selectedProduct, quantity: selectedProduct.quantity - 1}
      ]);

      return;
    }
    
    setCart([...cart.filter(element => element.product.id !== product._id)])
  }

  return (
    <div className={styles.app}>
      	<AppHeader />
        <main className={styles.content}>
          <BurgerIngredients data={data} clickHandler={addToCart} cart={cart}/>
          <BurgerConstructor data={data} cart={cart} handleClose={removeFromCart}/>
        </main>
    </div>
  );
}

export default App;
