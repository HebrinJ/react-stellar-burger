import React from 'react';
import style from './total-price.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderData } from '../../../services/actions/order-actions';

export default function TotalPrice() {
    const cart = useSelector(state => state.cart);
    const bun = useSelector(state => state.cart.bun);

    function getOrderIds() {
        let ingredients = cart.ingredients.map((item) => item.ingredientData._id);
        
        if(bun) {
            ingredients = ingredients.concat(bun._id);
        }

        return ingredients;
    }

    const dispatch = useDispatch();

    const [price, setPrice] = React.useState(0);

    React.useEffect(() => {
        countPrice();
    }, [cart])
    
    const countPrice = () => {        

        let currentPrice = cart.ingredients.reduce((price, ingredient) => {            
            price += ingredient.ingredientData.price;
            return price;
        }, 0)
        
        if(cart.bun) {            
            currentPrice += cart.bun.ingredientData.price*2
        }
        
        setPrice(currentPrice);
    }

    function handleOrder() {
        if(!cart.bun) {
            return;
        }
        
           dispatch(getOrderData(getOrderIds()));
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