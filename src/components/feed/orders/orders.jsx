import OrderCard from './order-card/orderCard'
import style from './orders.module.css'

export default function Orders() {

return (
    <div className={`${style.container} custom-scroll`}>
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
    </div>
)}