import React from 'react';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../../utils/hooks';
import { useDrag } from "react-dnd";
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import style from './catalog-item.module.css';
import { TIngredient } from '../../../utils/types-description';

type TCatalogItemProps = {
    ingredientData: TIngredient
};

export default function CatalogItem({ ingredientData }: TCatalogItemProps): JSX.Element {    

    const [count, setCount] = React.useState<number>(0);

    const cart = useSelector(state => state.cart);
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
    
    return (
        <Link to={`/ingredients/${ingredientData._id}`} state={{background: location, ingredientId: ingredientData._id}} className={style.link}>
            <div className={style.container} data-name={ingredientData._id} draggable ref={dragRef}>
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