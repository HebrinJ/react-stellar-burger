import styles from "./app.module.css";
import { data } from "../../utils/data";
import AppHeader from "../app-header/appHeader.jsx";
import BurgerIngredients from "../burger-Ingredients/burger-Ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor"

function App() {
  return (
    <div className={styles.app}>      
      	<AppHeader />
        <div className={styles.content}>
          <BurgerIngredients />
          <BurgerConstructor />
        </div>
    </div>
  );
}

export default App;
