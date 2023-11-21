import { useDispatch, useSelector } from 'react-redux';
import calculatePrice from '../../utils/calculatePrice';
import IngredientList from './ingredient-list/ingredientList';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { RESET_DETAILS, getOrderDetails } from '../../services/actions/order-actions';
import { getIngredientsData } from '../../services/actions/loading-actions';
import style from './orderDetails.module.css'
import OrderShowStatus from './order-show-status/orderShowStatus';

export default function OrderDetails({orderDetails}) {

const dispatch = useDispatch();

const allIngredients = useSelector(state => state.loading.allIngredients);
const storeOrder = useSelector(state => state.order.orderDetails.orders[0]);

const orderNumber = useParams();

useEffect(() => {  
    console.log(orderDetails)
    if(!orderDetails) {
        console.log('act')
        dispatch(getOrderDetails(orderNumber.number));
    }

    return (() => {
        dispatch({
            type: RESET_DETAILS,
        })
    })

}, [])

if(!orderDetails && storeOrder.number !== 0) {
    orderDetails = storeOrder
}

if(!orderDetails) return null

function getDetails(id) {
    if(allIngredients.length === 0) {
        dispatch(getIngredientsData())
    }
    
    const details = allIngredients.find(product => product._id === id);
    return { name: details?.name, icon: details?.image_mobile, price: details?.price}
}

function findIngredientAmounts() {  
    
    return orderDetails.ingredients.reduce((accum, id) => {
        return {
            ...accum,
            [id]: (accum[id] || 0) + 1,
        }
    }, {})
}

return (
    <section className={style.container}>
        <p className={`text text_type_digits-default ${style.number}`}>{`#${orderDetails.number}`}</p>
        <div className={style.header}>
            <h2 className='text text_type_main-medium'>{orderDetails.name}</h2>
            <OrderShowStatus status={orderDetails.status} />
        </div>        
        <div>
            <p className='text text_type_main-medium'>Состав:</p>
            <ul className={`${style.list} custom-scroll`}>
                {
                    Object.entries(findIngredientAmounts()).map(([id, amount], index) => {
                        const key = String(index)+id;
                        return <IngredientList product={getDetails(id)} amount={amount} key={key} />
                    })
                }
            </ul>
            <div className={style.underline}>
                <FormattedDate className='text text_type_main-default text_color_inactive' date={new Date(orderDetails.createdAt)} />
                <div className={style.priceBox}>
                    <p className='text text_type_digits-default'>{calculatePrice(allIngredients, orderDetails.ingredients)}</p>
                    <CurrencyIcon type='primary' />
                </div>
            </div>
        </div>
    </section>
)}