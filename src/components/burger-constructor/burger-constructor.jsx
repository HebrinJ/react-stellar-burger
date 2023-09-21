import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-constructor.module.css';
import React from 'react';
import { IngredientDataContext } from '../../contexts/ingredient-data-context.js';
import { OrderContext } from '../../contexts/order-context.js';
import TotalPrice from './total-price/total-price';
import { v4 as uuidv4 } from 'uuid';

function BurgerConstructor(props) {
    const data = React.useContext(IngredientDataContext);
    const order = React.useContext(OrderContext);
    
    let selectedBun = order.cart.bun;

    function handleClickRemove(event) {
        const parentNode = event.currentTarget.parentNode.parentNode;
        const ingredientName = parentNode.querySelector('.constructor-element__text').textContent;        
        
        removeFromCart(ingredientName);
    }

    function AddBun(type, bunId, data) {
        const ingredientAllData = data.find((elem) => elem._id === bunId);
    
        if(type === 'top') {
            return <ConstructorElement type='top' text={ingredientAllData.name+' верх'} price={ingredientAllData.price} thumbnail={ingredientAllData.image} isLocked={true}/>
        } else if (type === 'bottom') {
            return <ConstructorElement type='bottom' text={ingredientAllData.name+' низ'} price={ingredientAllData.price} thumbnail={ingredientAllData.image} isLocked={true}/>
        }
    }

    function removeFromCart(ingredientName) {
        const ingredient = data.find(elem => elem.name === ingredientName);    
        const id = ingredient._id;
        
        order.cartDispatch({
          type: 'remove',
          payload: id,
        })
      }
    
    function AddIngredient(data, ingrId) {
        return <ul className={style.ingredient} key={ingrId}>        
                <DragIcon type='primary'/>
                <ConstructorElement text={data.name} price={data.price} thumbnail={data.image} handleClose={handleClickRemove}/>
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
                        order.cart.ingredients.map((id) => {
                                const ingredientAllData = data.find((elem) => elem._id === id);                                 
                                    return AddIngredient(ingredientAllData, uuidv4());
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

export default BurgerConstructor;