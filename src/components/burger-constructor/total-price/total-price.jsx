import React from 'react';
import style from './total-price.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';

export default function TotalPrice({handleOrder}) {
    const cart = useSelector(state => state.cart);
    const data = useSelector(state => state.loading.allIngredients);

    const order = {};
    const [price, setPrice] = React.useState(0);

    React.useEffect(() => {
        countPrice();
    }, [order])
    
    const countPrice = () => {
        let currentPrice = cart.ingredients.reduce((price, product) => {
            const foundProduct = data.find((item) => item._id === product._id)
            
            if(foundProduct) {
                price += foundProduct.price;
            }

            return price;
        }, 0)

        if(cart.bun) {
            const price = data.find((product) => product._id === cart.bun._id).price;

            currentPrice += price*2;
        }

        setPrice(currentPrice);
    }

    return (
        <div className={style.order}>
                <div className={style.priceBox}>
                    <p className='text text_type_digits-medium'>{price}</p>
                    <CurrencyIcon type='primary' />
                </div>
                <Button htmlType='button' type='primary' size='medium' onClick={handleOrder}>Оформить заказ</Button>
        </div>
    )
}