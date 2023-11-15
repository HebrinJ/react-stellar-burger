import style from './feed.module.css'
import OrderState from './orders-state/ordersState'
import Orders from '../orders/orders'

export default function Feed() {

    return (
        <div className={style.main}>   
        <h2 className={`text text_type_main-large ${style.label}`}>Лента заказов</h2>              
          <main className={style.content}>
            <Orders />
            <OrderState />
          </main>     
      </div>
    )
}