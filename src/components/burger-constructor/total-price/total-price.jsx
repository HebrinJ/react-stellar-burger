import React from 'react';
import { OrderContext } from '../../../contexts/order-context.js';
import { IngredientDataContext } from '../../../contexts/ingredient-data-context.js'
import style from './total-price.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';

export default function TotalPrice({handleOrder}) {

    //const order = React.useContext(OrderContext);
    //const data = React.useContext(IngredientDataContext)
    const cart = useSelector(state => state.cart);

    const order = {};
    const data = {};
    const [price, setPrice] = React.useState(0);

    React.useEffect(() => {
        countPrice();
    }, [order])
    
    const countPrice = () => {
        let currentPrice = cart.ingredients.reduce((price, productId) => {
            const foundProduct = data.find((item) => item._id === productId)
            
            if(foundProduct) {
                price += foundProduct.price;
            }

            return price;
        }, 0)

        if(cart.bun) {
            const price = data.find((product) => product._id === cart.bun).price;

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