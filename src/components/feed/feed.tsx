import style from './feed.module.css'
import OrderState from './orders-state/orders-state'
import Orders from '../orders/orders'
import { useState } from 'react'
import { FEED_SOCKET_URL } from '../../utils/urls';
import { Outlet } from 'react-router-dom';

type TFeedState = {
  all: number;
  today: number;
};

export default function Feed(): JSX.Element {

const [amountOrders, setAmount] = useState<TFeedState>({all: 0, today: 0});

    return (
      <section className={style.main}>   
        <h2 className={`text text_type_main-large ${style.label}`}>Лента заказов</h2>
          <main className={style.content}>
            <Outlet />
            <Orders socketUrl={FEED_SOCKET_URL} isPersonal={false} numberOfOrdersSetter={setAmount} />
            <OrderState amounts={amountOrders} />
          </main>     
      </section>
    )
}