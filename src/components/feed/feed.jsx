import style from './feed.module.css'
import OrderState from './orders-state/ordersState'
import Orders from '../orders/orders'
import { useState } from 'react'
import { FEED_SOCKET_URL } from '../../utils/urls';

export default function Feed() {

  const [amountOrders, setAmount] = useState({all: 0, today: 0});
  const [orderNumbers, setOrders] = useState([]);

    return (
        <div className={style.main}>   
        <h2 className={`text text_type_main-large ${style.label}`}>Лента заказов</h2>
          <main className={style.content}>
            <Orders socketUrl={FEED_SOCKET_URL} numberOfOrdersSetter={setAmount} orderNumbers={setOrders}/>
            <OrderState amounts={amountOrders} orders={orderNumbers}/>
          </main>     
      </div>
    )
}