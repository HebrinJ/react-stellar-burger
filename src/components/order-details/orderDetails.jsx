import { useDispatch, useSelector } from 'react-redux';
import parseDate from '../../utils/parse-date';
import style from './orderDetails.module.css'
import calculatePrice from '../../utils/calculatePrice';
import IngredientList from './ingredient-list/ingredientList';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { GET_ORDER_DETAILS, getOrderDetails } from '../../services/actions/order-actions';
import { getData } from '../../utils/api';
import { getIngredientsData } from '../../services/actions/loading-actions';

export default function OrderDetails() {

const userOrders = useSelector(state => state.userOrders.orders);
const allOrders = useSelector(state => state.orders.orders);
const allIngredients = useSelector(state => state.loading.allIngredients)
//const order = useSelector(state => state.order)
const orderDetails = useSelector(state => state.order.orderDetails.orders[0]);
const dispatch = useDispatch();

const orderNumber = useParams();

useEffect(() => {   
    const order = findOrder();

    if(!order) {
        dispatch(getOrderDetails(orderNumber.number));
    }

}, [])


//const orderDetails = order.detailsReady ? order.orderDetails[0] : null;

//if(!orderDetails) return null;

if(!orderDetails) return null
//const { number, name, status, createdAt, ingredients } = orderDetails;
let statusColor = { color: '#fff' };

function findOrderInArray(orders) {
    return orders.find(order => order.number === +orderNumber.number);
}

function findOrder() {   

    let order = findOrderInArray(userOrders);

    if(order) {
        dispatch({
            type: GET_ORDER_DETAILS,
            payload: order
        })
    }

    order = findOrderInArray(allOrders);

    if(order) {        
        dispatch({
            type: GET_ORDER_DETAILS,
            payload: order
        })
    }
}

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

function showStatus() {
    switch (orderDetails.status) {
        case 'done':
            statusColor.color = '#00cccc';
            return 'Готов';
        case 'pending':
            statusColor.color = '#fff';  
            return 'Готовится';
        case 'created':
            statusColor.color = '#fff';  
            return 'Создан';    
        default:
            return '';
    }
}

return (
    <div className={style.container}>
        <p className={`text text_type_digits-default ${style.number}`}>{`#${orderDetails.number}`}</p>
        <div className={style.header}>
            <h2 className='text text_type_main-medium'>{orderDetails.name}</h2>
            <p className='text text_type_main-small' style={statusColor}>{showStatus()}</p>
        </div>        
        <div>
            <p className='text text_type_main-medium'>Состав:</p>
            <ul className={`${style.list} custom-scroll`}>
                {
                    Object.entries(findIngredientAmounts()).map(([id, amount]) => {
                        return <IngredientList product={getDetails(id)} amount={amount}/>
                    })
                }
            </ul>
            <div className={style.underline}>
                <FormattedDate className='text text_type_main-default text_color_inactive' date={new Date(orderDetails.createdAt)} />
                {/* <p className='text text_type_main-default text_color_inactive'>{parseDate(orderDetails.createdAt)}</p> */}
                <div className={style.priceBox}>
                    <p className='text text_type_digits-default'>{calculatePrice(allIngredients, orderDetails.ingredients)}</p>
                    <CurrencyIcon type='primary' />
                </div>
            </div>
        </div>
    </div>
)}