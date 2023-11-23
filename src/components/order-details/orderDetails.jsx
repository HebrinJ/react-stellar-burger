import { useDispatch, useSelector } from 'react-redux';
import calculatePrice from '../../utils/calculatePrice';
import IngredientList from './ingredient-list/ingredientList';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { RESET_DETAILS, getOrderDetails } from '../../services/actions/order-actions';
import { getIngredientsData } from '../../services/actions/loading-actions';
import OrderShowStatus from './order-show-status/orderShowStatus';
import { getOrder } from '../../utils/api';
import style from './orderDetails.module.css'

export default function OrderDetails({details}) {

const dispatch = useDispatch();
const orderNumber = useParams();

const allIngredients = useSelector(state => state.loading.allIngredients);
const storeOrder = useSelector(state => state.order.orderDetails.orders[0]);

const [orderDetails, setOrderDetails] = useState(null);

useEffect(() => {
    
    if(!details) {
        if(storeOrder.number !== 0) {
            setOrderDetails({
                    name: storeOrder.name,
                    status: storeOrder.status,
                    number: storeOrder.number,
                    ingredients: storeOrder.ingredients,
                    _id: storeOrder._id
            })
        }

        if((!orderDetails) || (orderDetails?.number === 0)) {
        
            const sendRequest = async () => {
                const response = await getOrder(orderNumber.number);
    
                if (response) {
                    setOrderDetails(response.orders[0])
                    return;
                }
            }
            
            if(!orderDetails) {            
                sendRequest()            
            }
        }
    } else {
        setOrderDetails(details)
    }

    return (() => {
        dispatch({
            type: RESET_DETAILS,
        })
    })

}, [])

if(!orderDetails) return null

const date = new Date(orderDetails.createdAt);

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
                    Object.entries(findIngredientAmounts()).map(([id, amount]) => {
                        const key = id;
                        return <IngredientList product={getDetails(id)} amount={amount} key={key} />
                    })
                }
            </ul>
            <div className={style.underline}>
                <FormattedDate className='text text_type_main-default text_color_inactive' date={date} />
                <div className={style.priceBox}>
                    <p className='text text_type_digits-default'>{calculatePrice(allIngredients, orderDetails.ingredients)}</p>
                    <CurrencyIcon type='primary' />
                </div>
            </div>
        </div>
    </section>
)}