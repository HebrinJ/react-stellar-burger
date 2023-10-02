import React from 'react';
import PropTypes from 'prop-types';
import Label from './label/label.jsx';
import style from './items-block.module.css';
import CatalogItem from '../catalog-item/catalog-item.jsx';
import { IngredientDataContext } from '../../../contexts/ingredient-data-context.js';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';


function ItemsBlock({label, type, handleOpenModal, handleAddToCart}) {
    const ingredientsData = useSelector(state => state.loading.allIngredients);    
    
    return (
        <>        
            <Label text={label} />
            <div className={style.typeBox}>
                {                    
                    ingredientsData.map((element) => {                    
                        if(element.type === type)
                            return <CatalogItem 
                                key={uuidv4()} 
                                image={element.image} 
                                name={element.name} 
                                price={element.price} 
                                ingredientId={element._id}
                                />
                    })}
            </div>        
        </>
    )
}

ItemsBlock.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['bun', 'sauce', 'main']).isRequired,
}

export default ItemsBlock