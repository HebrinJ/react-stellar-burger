import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-constructor.module.css';
import React from 'react';
import PropTypes from 'prop-types';
import { DataContext } from '../app/data-context.js';
import { OrderContext } from '../app/order-context.js';

function BurgerConstructor(props) {
    const data = React.useContext(DataContext);
    const cart = React.useContext(OrderContext);
    
    let selectedBun = cart.find((elem) => elem.product.type === 'bun');
    
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

    function separateCart() {
        const separatedCart = [];

        cart.forEach((elem) => {
            for (let i = 0; i < elem.quantity; i++) {
                separatedCart.push(elem);
            }
        })
        
        return separatedCart.sort((a, b) => { 
            if(a.product.id > b.product.id) return 1;
            if(a.product.id === b.product.id) return 0;
            if(a.product.id < b.product.id) return -1;
        });        
    }

    function handleClickClose(event) {
        const parentNode = event.currentTarget.parentNode.parentNode;
        const ingredientName = parentNode.querySelector('.constructor-element__text').textContent;        
        
        props.handleClose(ingredientName);
    }

    function handleClickOrder() {
        props.handleOpenModal('order');
    }

    return (
        <section className={style.constructorSection}>
            <div className={`${style.bunContainer}`}>
                <div>
                    {                            
                        selectedBun && AddBun('top', selectedBun, props.data) 
                    }                    
                </div>
                <div className={`${style.list} custom-scroll`}>
                    {       
                        /*props.data.map((ingredient, index) => {                             
                            if(ingredient.type !== 'bun') {
                                return AddIngredient(ingredient, handleClickClose, index);                                    
                            }})*/

                        separateCart().map((ingredient, index) => {                             
                        if(ingredient.product.type !== 'bun') {                                
                            const ingredientAllData = data.find((elem) => elem._id === ingredient.product.id);                                 
                                return AddIngredient(ingredientAllData, handleClickClose, index);                                    
                        }})
                    }
                </div>
                <div>
                    {                       
                        selectedBun && AddBun('bottom', selectedBun, props.data) 
                    }                    
                </div>                
            </div>
            <div className={style.order}>
                <div className={style.priceBox}>
                    <p className='text text_type_digits-medium'>{price}</p>
                    <CurrencyIcon type='primary' />
                </div>
                <Button htmlType='button' type='primary' size='medium' onClick={handleClickOrder}>Оформить заказ</Button>
            </div>
        </section>
    )
}

function AddBun(type, ingredient, data) {
    const ingredientAllData = data.find((elem) => elem._id === ingredient.product.id);

    if(type === 'top') {
        return <ConstructorElement type='top' text={ingredientAllData.name+' верх'} price={ingredientAllData.price} thumbnail={ingredientAllData.image} isLocked={true}/>
    } else if (type === 'bottom') {
        return <ConstructorElement type='bottom' text={ingredientAllData.name+' низ'} price={ingredientAllData.price} thumbnail={ingredientAllData.image} isLocked={true}/>
    }
}

function AddIngredient(data, handleClickClose, ingrId) {
    return <ul className={style.ingredient} key={ingrId}>        
            <DragIcon type='primary'/>
            <ConstructorElement text={data.name} price={data.price} thumbnail={data.image} handleClose={handleClickClose}/>
        </ul>
}

BurgerConstructor.propTypes = {
    handleClose: PropTypes.func.isRequired,
}

export default BurgerConstructor;