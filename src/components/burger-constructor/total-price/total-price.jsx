import React from 'react';
import style from './total-price.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { GET_ORDER_DATA, getOrderData } from '../../../services/actions/order-actions';
import { MODAL_ORDER } from '../../../services/actions/modal-actions';

export default function TotalPrice() {
    const cart = useSelector(state => state.cart);
    const data = useSelector(state => state.loading.allIngredients);
    const modal = useSelector(state => state.modal);
    const order = useSelector(state => state.order);

    //const ingredients = useSelector(state => state.cart.ingredients);
    const bun = useSelector(state => state.cart.bun);

    //const orderProducts = cart.ingredients.map((item) => item._id).concat(bun._id);

    function getOrderIds() {
        let ingredients = cart.ingredients.map((item) => item._id);
        
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

    function handleOrder() {           
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