import styles from "./app.module.css";
import React from "react";
import { data } from "../../utils/data";
import AppHeader from "../app-header/appHeader.jsx";
import BurgerIngredients from "../burger-Ingredients/burger-Ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor"

function App() {  
  const [constructorItems, setItems] = React.useState([]);
  const [itemsCount, setItemsCount] = React.useState({});

  React.useEffect(() => {
    data.forEach((item) => {
      itemsCount[item._id] = 0;
    })
  }, [])

  function updateCount(itemId) { 
    const value = itemsCount[itemId] += 1;
    setItemsCount({...itemsCount}, value);
  }

  function addIngredient(event) {
    const id = event.currentTarget.id;
    const item = data.find(item => item._id === id);
    
    if(item.type === 'bun') {
      constructorItems.forEach((element, index) => {
        if(element.type === 'bun') {
          constructorItems.splice(index, index+1);
        }
      })
    }    

    setItems([...constructorItems, item]);

    updateCount(id);
  }


  return (
    <div className={styles.app}>
      	<AppHeader />
        <main className={styles.content}>
          <BurgerIngredients data={data} clickHandler={addIngredient} itemsCount={itemsCount}/>
          <BurgerConstructor data={constructorItems} itemsCount={itemsCount}/>
        </main>
    </div>
  );
}

export default App;
