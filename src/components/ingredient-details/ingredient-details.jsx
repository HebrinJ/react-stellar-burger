import style from './ingredient-details.module.css';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientsData } from '../../services/actions/loading-actions';

export default function IngredientDetails() { 

    const dispatch = useDispatch();
    const product = useParams();   
    const ingredients = useSelector(state => state.loading.allIngredients);
    
    const [dataReady, setDataReady] = useState(false)
    const [details, setDetails] = useState(null);

    React.useEffect(() => {
        dispatch(getIngredientsData());
    }, [])

    React.useEffect(() => {
        setDetails(getIngredientData());

        if(details) {
            setDataReady(true);
        }        
    }, [details])

    function getIngredientData() {
        return ingredients.find(item => item._id === product.id);
    }
    
    return (
        <div className={style.position}> 
        {  dataReady && <>
            <h1 className={style.header+ ' text text_type_main-large'}>Детали ингредиента</h1>
            <img className={style.image} src={details.image_large} alt={details.name}></img>
            <p className={style.label+ ' text text_type_main-medium'}>{details.name}</p>
            <div className={style.containerInfo}>
                <div className={style.detailsBlock}>
                    <p className='text text_type_main-default text_color_inactive'>Калории, ккал</p>
                    <p className='text text_type_main-default text_color_inactive'>{details.calories}</p>
                </div>
                <div className={style.detailsBlock}>
                    <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
                    <p className='text text_type_main-default text_color_inactive'>{details.proteins}</p>
                </div>
                <div className={style.detailsBlock}>
                    <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
                    <p className='text text_type_main-default text_color_inactive'>{details.fat}</p>
                </div>
                <div className={style.detailsBlock}>
                    <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
                    <p className='text text_type_main-default text_color_inactive'>{details.carbohydrates}</p>
                </div>
            </div>
        </> }            
        </div>
    )
}