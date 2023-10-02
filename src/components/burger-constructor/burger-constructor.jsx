import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-constructor.module.css';
import React from 'react';
import { IngredientDataContext } from '../../contexts/ingredient-data-context.js';
import { OrderContext } from '../../contexts/order-context.js';
import TotalPrice from './total-price/total-price';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';

function BurgerConstructor(props) {    
    
    const ingredientsData = useSelector(store => store.allIngredients);
    const cartIngredients = useSelector(store => store.cart);
    const selectedBun = useSelector(state => state.cart.bun);

    function handleClickRemove(event) {
        // const parentNode = event.currentTarget.parentNode.parentNode;
        // const ingredientName = parentNode.querySelector('.constructor-element__text').textContent;        
        
        // removeFromCart(ingredientName);
    }

    function AddBun(type, bunId, data) {
        //const ingredientAllData = data.find((elem) => elem._id === bunId);
        //const selectedBun = ingredientsData.find((elem) => elem._id === bunId);
    
        if(type === 'top') {
            return <ConstructorElement type='top' text={selectedBun.name+' верх'} price={selectedBun.price} thumbnail={selectedBun.image} isLocked={true}/>
        } else if (type === 'bottom') {
            return <ConstructorElement type='bottom' text={selectedBun.name+' низ'} price={selectedBun.price} thumbnail={selectedBun.image} isLocked={true}/>
        }
    }

    function removeFromCart(ingredientName) {
        // const ingredient = data.find(elem => elem.name === ingredientName);    
        // const id = ingredient._id;
        
        // order.cartDispatch({
        //   type: 'remove',
        //   payload: id,
        // })
      }
    
    function AddIngredient(data, ingrId) {
        return <ul className={style.ingredient} key={ingrId}>        
                <DragIcon type='primary'/>
                <ConstructorElement text={ingredientsData.name} price={ingredientsData.price} thumbnail={ingredientsData.image} handleClose={handleClickRemove}/>
            </ul>
    }

    return (
        <section className={style.constructorSection}>
            <div className={`${style.bunContainer}`}>
                <div>
                    {                            
                        selectedBun && AddBun('top', selectedBun) 
                    }                    
                </div>
                <div className={`${style.list} custom-scroll`}>
                    {                             
                        cartIngredients.ingredients.map((id) => {
                                const ingredientAllData = ingredientsData.find((elem) => elem._id === id);                                 
                                    return AddIngredient(ingredientAllData, uuidv4());
                            })
                    }
                </div>
                <div>
                    {                       
                        selectedBun && AddBun('bottom', selectedBun) 
                    }                    
                </div>                
            </div>
            <TotalPrice handleOrder={props.handleOrder}/>            
        </section>
    )
}

export default BurgerConstructor;