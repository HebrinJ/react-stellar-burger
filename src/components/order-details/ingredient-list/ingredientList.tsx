import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import style from './ingredientList.module.css';
import { TIngredient } from '../../../utils/typesDescription';

type TIngredientListProps = {
    product: TIngredient;
    amount: number;
}

export default function IngredientList({product, amount}: TIngredientListProps): JSX.Element {

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

// IngredientList.propTypes = {
//     product: PropTypes.shape({
//         name: PropTypes.string,
//         icon: PropTypes.string,
//         price: PropTypes.number,
//     }),
//     amount: PropTypes.number,
// }