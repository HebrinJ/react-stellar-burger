import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './orderCard.module.css'
import OrderItemsFeed from './order-items-feed/orderItemsFeed'

export default function OrderCard() {

    const testData = [
        '4', '3', '2', '1'
    ]

return (
    <div className={style.container}>
        <div className={style.labelBox}>
            <p className={`text text_type_digits-default ${style.orderNumber}`}>#010023</p>
            <p className={`text text_type_main-default text_color_inactive ${style.date}`}>Сегодня, 16:20 i-GMT + 3</p>
        </div>
        <p className='text text_type_main-medium'>Some burgers</p>
        <div className={style.infoBox}>
            <div className={style.iconBox}>
                { testData.map(item => {
                    return <OrderItemsFeed position={item} />
                })}
            </div>            
            <div className={style.priceBox}>
                <p className='text text_type_digits-default'>460</p>
                <CurrencyIcon type='primary' />
            </div>
        </div>
    </div>
)}