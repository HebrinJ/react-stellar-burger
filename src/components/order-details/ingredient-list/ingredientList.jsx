import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import style from './ingredientList.module.css';

export default function IngredientList({product, amount}) {

return (
    <div className={style.container}>
        <div className={style.icon}>
            <img className={style.image} src={product.icon} alt={`Ингредиент ${product.name}`}/>
        </div>
        <p className={`text text_type_main-small ${style.name}`}>{product.name}</p>
        <div className={style.priceBox}>
            <p className='text text_type_digits-default'>{amount} x {product.price}</p>
            <CurrencyIcon type="primary" />
        </div>
    </div>
)}

IngredientList.propTypes = {
    product: PropTypes.shape({
        name: PropTypes.string,
        icon: PropTypes.string,
        price: PropTypes.number,
    }),
    amount: PropTypes.number,
}