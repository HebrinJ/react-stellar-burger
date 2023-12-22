import React, { SyntheticEvent } from 'react';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../../../utils/hooks';
import { SELECT_ITEM } from '../../../services/actions/select-actions';
import { MODAL_INGR_INFO } from '../../../services/actions/modal-actions';
import { useDrag } from "react-dnd";
import { useLocation } from 'react-router-dom';
import { SET_ROOT } from '../../../services/actions/route-actions';
import { Link } from 'react-router-dom';
import style from './catalog-item.module.css';
import { TIngredient } from '../../../utils/types-description';

type TCatalogItemProps = {
    ingredientData: TIngredient
};

export default function CatalogItem({ ingredientData }: TCatalogItemProps): JSX.Element {    

    const [count, setCount] = React.useState<number>(0);

    const cart = useSelector(state => state.cart);
    const data = useSelector(state => state.loading.allIngredients);
    const selectedProduct = useSelector(state => state.selected);
    const dispatch = useDispatch();
    const location = useLocation();
    
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

    function showInrgedientData(event: SyntheticEvent) {
        const clickedProductId = event.currentTarget.getAttribute('data-name');
        
        if(clickedProductId) {
            dispatch({
                type: SET_ROOT
            })
        
            setIngredientData(clickedProductId);

            openModal();
        }
    }

    function setIngredientData(clickedProductId: string): void {        
        
        const foundedProduct = data.find(allItemsIds => allItemsIds._id === clickedProductId);
        
        dispatch({
            type: SELECT_ITEM,
            payload: {
                itemId: foundedProduct?._id,
                type: foundedProduct?.type,
                name: foundedProduct?.name,
                proteins: foundedProduct?.proteins,
                price: foundedProduct?.price,
                fat: foundedProduct?.fat,
                carbohydrates: foundedProduct?.carbohydrates,
                calories: foundedProduct?.calories,
                image: foundedProduct?.image,
                image_large: foundedProduct?.image_large,
                image_mobile: foundedProduct?.image_mobile,
            }
        });        
    }    

    function openModal(): void { 
        dispatch({
            type: MODAL_INGR_INFO,
            payload: selectedProduct,
        })
    }       
    
    return (
        <Link to={`/ingredients/${ingredientData._id}`} state={{background: location}} className={style.link}>
            <div className={style.container} onClick={showInrgedientData} data-name={ingredientData._id} draggable ref={dragRef}>
                <Counter count={count}/>
                <img className={style.image} src={ingredientData.image} alt={ingredientData.name}/>
                <div className={style.textBox}>
                    <div className={style.price}>
                        <p className='text text_type_digits-default'>{ingredientData.price}</p><CurrencyIcon type='primary' />
                    </div>
                    <p className='text text_type_main-default'>{ingredientData.name}</p>
                </div>
                
            </div>
        </Link>
    )
}