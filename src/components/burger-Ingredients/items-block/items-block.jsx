import React from 'react';
import PropTypes from 'prop-types';
import Label from './label/label.jsx';
import style from './items-block.module.css';
import CatalogItem from '../catalog-item/catalog-item.jsx';
import { IngredientDataContext } from '../../../contexts/ingredient-data-context.js';

function ItemsBlock({label, type, handleOpenModal, handleAddToCart}) {
    const ingredientsData = React.useContext(IngredientDataContext);
    
    return (
        <>        
            <Label text={label} />
            <div className={style.typeBox}>
                {                    
                    ingredientsData.map((element, index) => {                    
                        if(element.type === type)
                            return <CatalogItem 
                                key={index} 
                                image={element.image} 
                                name={element.name} 
                                price={element.price} 
                                currentItemId={element._id} 
                                handleOpenModal={handleOpenModal}
                                type={type}/>
                    })}
            </div>        
        </>
    )
}

ItemsBlock.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['bun', 'sauce', 'main']).isRequired,
    handleOpenModal: PropTypes.func.isRequired,
}

export default ItemsBlock