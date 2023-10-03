import PropTypes, { func } from 'prop-types';
import React from 'react';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './catalog-item.module.css';
import { useDispatch, useSelector } from 'react-redux';

import { IngredientDataContext } from '../../../contexts/ingredient-data-context.js';
import { OrderContext } from '../../../contexts/order-context.js';
import { SELECT_ITEM } from '../../../services/actions/select-actions';
import { MODAL_INGR_INFO } from '../../../services/actions/modal-actions';
import { useDrag } from "react-dnd";

function CatalogItem({image, name, price, ingredientId, handleAddToCart}) {
    const [count, setCount] = React.useState(0);

    //const data = React.useContext(IngredientDataContext);
    //const order = React.useContext(OrderContext);
    //const order = useSelector(state => state.order);
    const data = useSelector(state => state.loading.allIngredients);
    const selectedProduct = useSelector(state => state.selected);
    const dispatch = useDispatch();
    
    const [{isDrag}, dragRef] = useDrag({
        type: 'product',
        item: {ingredientId},
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    // React.useEffect(() => {        
    //     updateCount();
    // }, [order.cartIngredients]);    

    // const updateCount = () => {  
        
    //     if(order.cartIngredients.bun === ingredientId) {
    //         setCount(1);
    //         return;
    //     }

    //     const products = order.cartIngredients.ingredients.filter((elem) => elem === ingredientId)        
    //     setCount(products.length);      
    // }  

    function showInrgedientData(event) {
        const clickedProductId = event.currentTarget.getAttribute('name');
        
        setIngredientData(clickedProductId);
        openModal();     
    }

    function setIngredientData(clickedProductId) {
        const foundedProduct = data.find(allItemsIds => allItemsIds._id === clickedProductId);

        dispatch({
            type: SELECT_ITEM,
            payload: {
                itemId: foundedProduct._id,
                type: foundedProduct.type,
                name: foundedProduct.name,
                proteins: foundedProduct.proteins,
                price: foundedProduct.price,
                fat: foundedProduct.fat,
                carbohydrates: foundedProduct.carbohydrates,
                calories: foundedProduct.calories,
                image: foundedProduct.image,
                image_large: foundedProduct.image_large,
                image_mobile: foundedProduct.image_mobile,
            }
        });
    }    

    function openModal() {        
        dispatch({
            type: MODAL_INGR_INFO,
            payload: selectedProduct,
        })
    }

    //function handleAddToCart(event) {        
        //const id = event.currentTarget.getAttribute('name');
        //const selectedProduct = data.find(item => item._id === id);
    
        // if(selectedProduct.type === 'bun') {
        //     order.cartDispatch({
        //         type: 'addBun',
        //         payload: id,
        //     })
        //     return;
        // }
        
        // order.cartDispatch({
        //     type: 'add',
        //     payload: id,
        // })       
    
    
    return (
        <div className={style.container} onClick={showInrgedientData} name={ingredientId} draggable ref={dragRef}>
            <Counter count={count}/>
            <img className={style.image} src={image} alt={name}/>
            <div className={style.textBox}>
                <div className={style.price}>
                    <p className='text text_type_digits-default'>{price}</p><CurrencyIcon type='primary' />
                </div>
                <p className='text text_type_main-default'>{name}</p>
            </div>
            
        </div>
    )
}

CatalogItem.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    ingredientId: PropTypes.string,
    handleClickOrder: PropTypes.func,
    type: PropTypes.oneOf(['bun', 'sauce', 'main']),
}

export default CatalogItem;