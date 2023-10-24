import PropTypes from 'prop-types';
import React from 'react';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './catalog-item.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { SELECT_ITEM } from '../../../services/actions/select-actions';
import { MODAL_INGR_INFO } from '../../../services/actions/modal-actions';
import { useDrag } from "react-dnd";

export default function CatalogItem({ingredientData}) {
    const [count, setCount] = React.useState(0);    

    const cart = useSelector(state => state.cart);
    const data = useSelector(state => state.loading.allIngredients);
    const selectedProduct = useSelector(state => state.selected);
    const dispatch = useDispatch();
    
    const [{isDrag}, dragRef] = useDrag({
        type: 'product',
        item: {ingredientData},
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    React.useEffect(() => {        
        updateCount();
    }, [cart]);    

    const updateCount = () => {  
        
        if(cart.bun && cart.bun.ingredientData._id === ingredientData._id) {
            setCount(1);
            return;
        }

        const products = cart.ingredients.filter((elem) => elem.ingredientData._id === ingredientData._id)        
        setCount(products.length);      
    }  

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
    
    return (
        <div className={style.container} onClick={showInrgedientData} name={ingredientData._id} draggable ref={dragRef}>
            <Counter count={count}/>
            <img className={style.image} src={ingredientData.image} alt={ingredientData.name}/>
            <div className={style.textBox}>
                <div className={style.price}>
                    <p className='text text_type_digits-default'>{ingredientData.price}</p><CurrencyIcon type='primary' />
                </div>
                <p className='text text_type_main-default'>{ingredientData.name}</p>
            </div>
            
        </div>
    )
}

CatalogItem.propTypes = {
    ingredientData: PropTypes.shape({
        _id: PropTypes.string,
        type: PropTypes.oneOf(['bun', 'sauce', 'main']),
        name: PropTypes.string,
        proteins: PropTypes.number,
        price: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,
        image: PropTypes.string,
        image_large: PropTypes.string,
        image_mobile: PropTypes.string,
    }),
}