import styles from "./app.module.css";
import React from "react";
import { data } from "../../utils/data";
import AppHeader from "../app-header/appHeader.jsx";
import BurgerIngredients from "../burger-Ingredients/burger-Ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor"

function App() {  
  const [constructorItems, setItems] = React.useState([]);  

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
  }

  return (
    <div className={styles.app}>
      	<AppHeader />
        <main className={styles.content}>
          <BurgerIngredients data={data} clickHandler={addIngredient}/>
          <BurgerConstructor data={constructorItems}/>
        </main>
    </div>
  );
}

export default App;
