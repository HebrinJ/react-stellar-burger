import { useSelector } from 'react-redux';
import parseDate from '../../utils/parse-date';
import style from './orderDetails.module.css'
import calculatePrice from '../../utils/calculatePrice';
import IngredientList from './ingredient-list/ingredientList';

export default function OrderDetails({order}) {  
    
const allIngredients = useSelector(state => state.loading.allIngredients)
const { number, name, status, createdAt, ingredients } = order;

function getDetails(id) {
    const details = allIngredients.find(product => product._id === id);

    return { name: details.name, icon: details.image_mobile, price: details.price}
}

function findIngredientAmounts() {
    return ingredients.reduce((accum, id) => {
        return {
            ...accum,
            [id]: (accum[id] || 0) + 1,
        }
    }, {})
}

return (
    <div className={style.container}>
        <p>{`#${number}`}</p>
        <p>{name}</p>
        <p>{status}</p>
        <div>
            <p>Состав:</p>
            <ul>
                {
                    Object.entries(findIngredientAmounts()).map(([id, amount]) => {
                        return <IngredientList product={getDetails(id)} amount={amount}/>
                    })
                }
            </ul>
            <div>
                <p>{parseDate(createdAt)}</p>
                <p>{calculatePrice(allIngredients, ingredients)}</p>
            </div>
        </div>
    </div>
)}