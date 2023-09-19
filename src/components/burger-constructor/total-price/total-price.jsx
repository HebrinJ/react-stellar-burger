import React from 'react';
import { OrderContext } from '../../app/order-context.js';
import style from './total-price.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

export default function TotalPrice({separateCart, handleClickOrder}) {

    const cart = React.useContext(OrderContext);
    const [price, setPrice] = React.useState(0);

    React.useEffect(() => {
        countPrice();
    }, [cart])

    const countPrice = () => {        
        const selectedProducts = separateCart();
        let currentPrice = 0;

        for (let i = 0; i < selectedProducts.length; i++) {            
            currentPrice += selectedProducts[i].product.price;
        } 
        
        let isBun = selectedProducts.find((item) => item.product.type === 'bun');

        if(isBun) {
            currentPrice += isBun.product.price;
        }

        setPrice(currentPrice);
    }

    return (
        <div className={style.order}>
                <div className={style.priceBox}>
                    <p className='text text_type_digits-medium'>{price}</p>
                    <CurrencyIcon type='primary' />
                </div>
                <Button htmlType='button' type='primary' size='medium' onClick={handleClickOrder}>Оформить заказ</Button>
        </div>
    )
}