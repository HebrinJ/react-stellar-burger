import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-constructor.module.css';
import React from 'react';
import PropTypes from 'prop-types';
import { DataContext } from '../app/data-context.js';
import { OrderContext } from '../app/order-context.js';
import TotalPrice from './total-price/total-price';

function BurgerConstructor(props) {
    const data = React.useContext(DataContext);
    const cart = React.useContext(OrderContext);
    
    let selectedBun = cart.bun;

    function handleClickClose(event) {
        const parentNode = event.currentTarget.parentNode.parentNode;
        const ingredientName = parentNode.querySelector('.constructor-element__text').textContent;        
        
        props.handleClose(ingredientName);
    }

    function AddBun(type, bunId, data) {
        const ingredientAllData = data.find((elem) => elem._id === bunId);
    
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

    return (
        <section className={style.constructorSection}>
            <div className={`${style.bunContainer}`}>
                <div>
                    {                            
                        selectedBun && AddBun('top', selectedBun, data) 
                    }                    
                </div>
                <div className={`${style.list} custom-scroll`}>
                    {                             
                        cart.ingredients.map((id, index) => {
                                const ingredientAllData = data.find((elem) => elem._id === id);                                 
                                    return AddIngredient(ingredientAllData, handleClickClose, index);                                    
                            })
                    }
                </div>
                <div>
                    {                       
                        selectedBun && AddBun('bottom', selectedBun, data) 
                    }                    
                </div>                
            </div>
            <TotalPrice handleOrder={props.handleOrder}/>            
        </section>
    )
}

BurgerConstructor.propTypes = {
    handleClose: PropTypes.func.isRequired,
}

export default BurgerConstructor;