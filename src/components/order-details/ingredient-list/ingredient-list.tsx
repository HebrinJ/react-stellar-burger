import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './ingredient-list.module.css';
import { TIngredient } from '../../../utils/types-description';

type TIngredientListProps = {
    product: TIngredient;
    amount: number;
}

export default function IngredientList({product, amount}: TIngredientListProps): JSX.Element | null {    

function validateProps() {
    if(product === undefined || null) {
        return false;
    }
}

if(validateProps() === false) {
    return null;
}

return (
    <div className={style.container}>
        <div className={style.icon}>
            <img className={style.image} src={product.image_mobile} alt={`Ингредиент ${product.name}`}/>
        </div>
        <p className={`text text_type_main-small ${style.name}`}>{product.name}</p>
        <div className={style.priceBox}>
            <p className='text text_type_digits-default'>{amount} x {product.price}</p>
            <CurrencyIcon type="primary" />
        </div>
    </div>
)}