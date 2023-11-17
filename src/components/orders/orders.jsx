import { useEffect, useRef, useState } from 'react'
import OrderCard from './order-card/orderCard'
import style from './orders.module.css'

export default function Orders({all, amount, orderNumbers}) {

const [orders, setOrders] = useState();
const token = localStorage.getItem('accessToken').slice(7);

const url = all ? 'wss://norma.nomoreparties.space/orders/all' : `wss://norma.nomoreparties.space/orders?token=${token}`

useEffect(() => {
    const connection = new WebSocket(url);
    connection.onopen = event => {console.log('Connection set')}

    connection.onmessage = event => {
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

    console.log('component orders render');
    return(() => {
        connection.close(1000, 'connection closed')
    })
  }, [orders])

return (
    <div className={`${style.container} custom-scroll`}>
        { orders?.map((order) => {
            return <OrderCard number={order.number} date={order.createdAt} name={order.name} ingredients={order.ingredients} status={order.status}/>
        })}
    </div>
)}