import { useEffect, useState } from 'react'
import OrderCard from './order-card/orderCard'
import style from './orders.module.css'
import { webSocketConnect, webSocketClose } from '../../utils/use-socket';

export default function Orders({socketUrl, amount, orderNumbers}) {

const [orders, setOrders] = useState();

useEffect(() => {
    const connection = webSocketConnect(socketUrl);
    connection.onmessage = event => { prepareData(event); }

    return (() => {
        webSocketClose(connection);
    })
}, [])

function prepareData(event) {
    
        const data = JSON.parse(event.data);
        setOrders(data.orders);

        if(amount !== undefined) {
            amount({all: data.total, today: data.totalToday});
        }
        
        if(orderNumbers !== undefined) {
            const ordersForFeed = orders?.map((order) => {
                return {number: order.number, state: order.status}
            })

            orderNumbers(ordersForFeed)
        }
    };

return (
    <div className={`${style.container} custom-scroll`}>
        { orders?.map((order) => {
            return <OrderCard number={order.number} date={order.createdAt} name={order.name} ingredients={order.ingredients} status={order.status}/>
        })}
    </div>
)}