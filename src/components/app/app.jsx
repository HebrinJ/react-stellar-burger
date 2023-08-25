import styles from "./app.module.css";
import React from "react";
import { data } from "../../utils/data";
import AppHeader from "../app-header/appHeader.jsx";
import BurgerIngredients from "../burger-Ingredients/burger-Ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor"
import { element, func } from "prop-types";

function App() {  
  const [constructorItems, setItems] = React.useState([]);
  //const [itemsCount, setItemsCount] = React.useState({});

  // React.useEffect(() => {
  //   data.forEach((item) => {
  //     itemsCount[item._id] = 0;
  //   })
  // }, [])

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
      // setCart([
      //   ...cart.filter(element => element.product.id !== inCartProduct.product.id),
      //    {...inCartProduct, quantity: inCartProduct.quantity + 1}
      // ]);
      updateQuantity(inCartProduct);
      return;
    }

    addNewProduct(selectedProduct);
    // const newProduct = {
    //   product: {
    //     id: selectedProduct._id,
    //     type: selectedProduct.type,
    //     price: selectedProduct.price,
    //   },
    //   quantity: 1
    // }

    // setCart((prevState) => ([
    //   ...prevState, newProduct      
    // ]));
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
    //if(selectedProduct.type === 'bun') {
      const newProduct = getNewProduct(selectedProductData);
      
      setCart([
        ...cart.filter(element => element.product.type !== 'bun'), newProduct
      ])
      
    //}
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

  // const selectedIngredient = {
  //   product: {
  //     id: '',
  //     type: '',
  //     price: 0,
  //   },    
  //   quantity: 0
  // }

  // function updateCount(itemId, type) {     
  //   let value = itemsCount[itemId] += 1;

  //   if(type === 'bun') {      
  //     data.forEach((item) => {  
  //       if(item.type === 'bun') {
  //         for (let id in itemsCount) {
  //           if(item._id === id) {
  //             itemsCount[item._id] = 0;
  //             //setItemsCount({...itemsCount, [id]: 0});     
  //           }
  //         }
  //       }
  //     })

  //     setItemsCount({...itemsCount, [itemId]: 1}); 
  //     return;
  //   }

  //   setItemsCount({...itemsCount, [itemId]: value});    
  // }

  // function addIngredient(event) {
  //   const id = event.currentTarget.id;
  //   const item = data.find(item => item._id === id);
    
  //   if(item.type === 'bun') {
  //     constructorItems.forEach((element, index) => {
  //       if(element.type === 'bun') {
  //         constructorItems.splice(index, index+1);
  //       }
  //     })
  //   }    

  //   setItems([...constructorItems, item]);

  //   updateCount(id, item.type);
  // }


  return (
    <div className={styles.app}>
      	<AppHeader />
        <main className={styles.content}>
          <BurgerIngredients data={data} clickHandler={addToCart} cart={cart}/>
          <BurgerConstructor data={data} cart={cart}/>
        </main>
    </div>
  );
}

export default App;
