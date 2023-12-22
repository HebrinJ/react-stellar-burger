import { useSelector } from '../../../../utils/hooks';
import style from './order-items-feed.module.css';

type TOrderItems = {
    position: number;
    id: string;
    number?: string;
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