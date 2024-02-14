import { useDispatch, useSelector } from '../../utils/hooks';
import calculatePrice from '../../utils/calculatePrice';
import IngredientList from './ingredient-list/ingredient-list';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getIngredientsData } from '../../services/actions/loading-actions';
import OrderShowStatus from './order-show-status/order-show-status';
import { getOrder } from '../../utils/api';
import style from './order-details.module.css'
import { TIngredient, TOrderDetails } from '../../utils/types-description';

export default function OrderDetails(): JSX.Element | null {

const details = useSelector(state => state.modal.modalSettings.orderInfo);

const dispatch = useDispatch();
const { number } = useParams();

const allIngredients = useSelector(state => state.loading.allIngredients);
const storeOrder = useSelector(state => state.order.orderDetails.orders[0]);

const [orderDetails, setOrderDetails] = useState<TOrderDetails>({
    _id: '',
    ingredients: [],
    owner: '',
    status: '',
    name: '',
    createdAt: '',
    updatedAt: '',
    number: 0
});

useEffect(() => {
    
    if(!details) {
        if(storeOrder.number !== 0) {
            setOrderDetails({
                    name: storeOrder.name,
                    status: storeOrder.status,
                    number: storeOrder.number,
                    ingredients: storeOrder.ingredients,
                    _id: storeOrder._id,
                    owner: storeOrder.owner,
                    createdAt: storeOrder.createdAt,
                    updatedAt: storeOrder.updatedAt,
            })
        }

        if((!orderDetails) || (orderDetails?.number === 0)) {
        
            const sendRequest = async () => {
                if(number) {
                const response = await getOrder(number);
    
                if (response) {
                    setOrderDetails(response.orders[0])
                    return;
                }}
            }          
            
            sendRequest();
        }
    } else {
        setOrderDetails(details);
    }

}, [])

if(!orderDetails) return null

const date = new Date(orderDetails.createdAt);

function getDetails(id: string):TIngredient {
    if(allIngredients.length === 0) {
        dispatch(getIngredientsData())
    }
    
    const details = allIngredients.find(product => product._id === id);
    return details!;
}

function findIngredientAmounts(): Record<string, number> {

    return orderDetails.ingredients.reduce<Record<string, number>>((accum, id) => {

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