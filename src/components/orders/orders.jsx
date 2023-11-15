import { useEffect, useRef, useState } from 'react'
import OrderCard from './order-card/orderCard'
import style from './orders.module.css'

export default function Orders() {

const [orders, setOrders] = useState();

const token = localStorage.getItem('accessToken').slice(7);

useEffect(() => {
    const connection = new WebSocket(`wss://norma.nomoreparties.space/orders?token=${token}`);
    connection.onopen = event => {console.log('Connection set')}

    connection.onmessage = event => {
        const data = JSON.parse(event.data);
        setOrders(data.orders);
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