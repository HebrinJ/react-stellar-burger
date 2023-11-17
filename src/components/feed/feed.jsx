import style from './feed.module.css'
import OrderState from './orders-state/ordersState'
import Orders from '../orders/orders'
import { useState } from 'react'

export default function Feed() {

  const [amountOrders, setAmount] = useState({all: 0, today: 0});
  const [orderNumbers, setOrders] = useState([]);

    return (
        <div className={style.main}>   
        <h2 className={`text text_type_main-large ${style.label}`}>Лента заказов</h2>
          <main className={style.content}>
            <Orders all={true} amount={setAmount} orderNumbers={setOrders}/>
            <OrderState amounts={amountOrders} orders={orderNumbers}/>
          </main>     
      </div>
    )
}