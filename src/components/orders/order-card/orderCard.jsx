import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './orderCard.module.css'
import OrderItemsFeed from './order-items-feed/orderItemsFeed'
import { useState, useEffect } from 'react'

export default function OrderCard({number, date, name, ingredients, status}) {

function showStatus() {
    switch (status) {
        case 'done':            
            return 'Готов';
        case 'pending':
            return 'Готовится';
        case 'created':
            return 'Создан';    
        default:
            return '';
    }
}

function setDate() {
    let dateString = ''

    const timestamp = Date.parse(date);
    const timestampNow = Date.now();

    if(timestampNow - timestamp <= 86400000) {
        dateString = 'Сегодня, '
    } else if (timestampNow - timestamp > 86400000 && timestampNow - timestamp <= 172800000) {
        dateString = 'Вчера, '
    } else {
        dateString = date.slice(0,10).concat(', ');
    }

    const time = date.slice(11, 16);
    dateString = dateString.concat(time+' ');

    const utcFull = new Date(timestamp).toUTCString();
    const utcIndex = utcFull.indexOf('GMT');
    const utc = utcFull.slice(utcIndex);

    return dateString.concat(utc);
}

return (
    <div className={style.container}>
        <div className={style.labelBox}>
            <p className={`text text_type_digits-default ${style.orderNumber}`}>{`#${number}`}</p>
            <p className={`text text_type_main-default text_color_inactive ${style.date}`}>{setDate()}</p>
        </div>
        <div className={style.statusBox}>
            <p className='text text_type_main-medium'>{name}</p>
            { status !== '' && <p className='text text_type_main-small'>{showStatus()}</p>}
        </div>
        <div className={style.infoBox}>
            <div className={style.iconBox}>
                { ingredients?.map((id, index) => {
                    if(id === null) return;

                    return <OrderItemsFeed id={id} position={ingredients.length - index}/>
                })}
            </div>            
            <div className={style.priceBox}>
                <p className='text text_type_digits-default'>460</p>
                <CurrencyIcon type='primary' />
            </div>
        </div>
    </div>
)}