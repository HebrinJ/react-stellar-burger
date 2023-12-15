import { useSelector } from '../../../../utils/hooks';
import PropTypes from 'prop-types';
import style from './orderItemsFeed.module.css';

type TOrderItems = {
    position: number;
    id: string;
    number: number;
}

export default function OrderItemsFeed({position, id, number}: TOrderItems) {   
    
    const ingredients = useSelector(state => state.loading.allIngredients);
    const ingredient = ingredients.find(ingredient => ingredient._id === id);
    const image = ingredient?.image_mobile;

return (
    <div className={style.icon} style={{zIndex: `${position}`}}>
        <img className={style.image} src={image} alt={`Ингредиент ${ingredient?.name}`} />
        <p className={`text text_type_digits-default ${style.number}`}>{number}</p>
    </div>
)}

// OrderItemsFeed.propTypes = {
//     position: PropTypes.number,
//     id: PropTypes.string,
//     number: PropTypes.string,
// }