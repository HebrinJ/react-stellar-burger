import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-constructor.module.css';
import TotalPrice from './total-price/total-price';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop  } from "react-dnd";
import { ADD_BUN, ADD_INGR, REMOVE_INGR, MOVE_INGR } from '../../services/actions/cart-actions';
import DraggableIngredient from './draggable-ingredient/draggable-ingredient';
import { useCallback, useState } from 'react';

function BurgerConstructor() {    
    
    const ingredientsData = useSelector(state => state.loading.allIngredients);
    const cartIngredients = useSelector(state => state.cart);
    const selectedBun = useSelector(state => state.cart.bun);

    const dispatch = useDispatch();

    const [{ isOver }, dropTarget] = useDrop({
        accept: "product",
        drop(droppedItem) {
             onDropHandler(droppedItem);
        },
        collect: monitor => ({
            isOver: !!monitor.isOver()
        }),        
    });

    function onDropHandler(droppedItem) {        
        const ingredientData = droppedItem.ingredientData;
        //const productData = getDraggingProductData(productId);

        if(ingredientData.type === 'bun') {
            dispatch({
                type: ADD_BUN,
                payload: {ingredientData, key: uuidv4()}
            })
        } else {
            dispatch({
                type: ADD_INGR,
                payload: {ingredientData, key: uuidv4()}
            })
        }        
    }

    // function getDraggingProductData(productId) {
    //     return ingredientsData.find(product => product._id === productId.ingredientId);
    // }

    function handleClickRemove(product) {
        dispatch({
            type: REMOVE_INGR,
            payload:  product.key,
        })

        // const parentNode = event.currentTarget.parentNode.parentNode;
        // const ingredientName = parentNode.querySelector('.constructor-element__text').textContent;        
        
        // removeFromCart(ingredientName);
    }

    function AddBun(type) {
        const bunData = selectedBun.ingredientData;
        
        if(type === 'top') {
            return <ConstructorElement type='top' text={bunData.name+' верх'} price={bunData.price} thumbnail={bunData.image} isLocked={true}/>
        } else if (type === 'bottom') {
            return <ConstructorElement type='bottom' text={bunData.name+' низ'} price={bunData.price} thumbnail={bunData.image} isLocked={true}/>
        }
    }

    function removeFromCart(ingredientName) {
        const ingredient = ingredientsData.find(elem => elem.name === ingredientName); 
        const id = ingredient._id;

        dispatch({
            type: REMOVE_INGR,
            payload: id,
        })
      }       

    const moveProduct = useCallback((dragIndex, hoverIndex) => {  
        dispatch({
            type: MOVE_INGR,
            payload: {dragIndex, hoverIndex}
        })        
      }, [cartIngredients])

    return (
        <section className={style.constructorSection}>
            
            <div className={`${style.bunContainer} ${isOver ? style.dropReady : ''}`} ref={dropTarget}>            
            { 
                cartIngredients.ingredients.length === 0 && cartIngredients.bun === null && 
                <div className={`${style.blancCart} text text_type_main-small`}>Перенесите ингредиент</div> 
            }
                <div>
                    {                            
                        selectedBun && AddBun('top') 
                    }                    
                </div>
                <div className={`${style.list} custom-scroll`} >
                    {                        
                        cartIngredients.ingredients.map((product, index) => {                                                        
                                //const productData = ingredientsData.find((elem) => elem._id === product._id); 
                                //const uid = uuidv4();
                                    return <DraggableIngredient productData={product.ingredientData} key={product.key} 
                                    index={index} handleClose={handleClickRemove} moveProduct={moveProduct}/>
                            })                          
                    }
                </div>
                <div>
                    {                       
                        selectedBun && AddBun('bottom') 
                    }                    
                </div>                
            </div>
            <TotalPrice />            
        </section>
    )
}

export default BurgerConstructor;