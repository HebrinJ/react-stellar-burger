import { useEffect, useState } from 'react'
import OrderCard from './order-card/orderCard'
import style from './orders.module.css'
import { webSocketConnect, webSocketClose } from '../../utils/use-socket';
import { useDispatch, useSelector } from 'react-redux';
import { GET_ORDERS } from '../../services/actions/all-orders-actions';
import { GET_USER_ORDERS } from '../../services/actions/user-orders-actions';

export default function Orders({socketUrl, numberOfOrdersSetter, isPersonal}) {

//const [orders, setOrders] = useState();
const orders = useSelector(state => state.orders.orders)
const dispatch = useDispatch();

useEffect(() => {
    const connection = webSocketConnect(socketUrl);
    connection.onmessage = event => {
        const data = JSON.parse(event.data);

        prepareDataToShow(data);

        if(isPersonal) {
            dispatch({
                type: GET_USER_ORDERS,
                payload: data,
            })
        } else {
            dispatch({
                type: GET_ORDERS,
                payload: data,
            })
        }
        
    }

    return (() => {
        webSocketClose(connection);
    })
}, [])

function prepareDataToShow(data) {
        
        //setOrders(data.orders);

        if(numberOfOrdersSetter) {
            numberOfOrdersSetter({all: data.total, today: data.totalToday});
        }        
        
        // const ordersForFeed = orders?.map((order) => {
        //     return {number: order.number, state: order.status}
        // })

        //orderNumbers(ordersForFeed)        
    };

return (
    <div className={`${style.container} custom-scroll`}>
        { orders?.map((order) => {            
            return <OrderCard order={order} />
        })}
    </div>
)}