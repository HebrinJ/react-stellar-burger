import PropTypes from 'prop-types';
import Label from './label/label.jsx';
import style from './items-block.module.css';
import CatalogItem from '../catalog-item/catalog-item.jsx';
import { useSelector } from 'react-redux';

export default function ItemsBlock({label, type}) {
    const ingredientsData = useSelector(state => state.loading.allIngredients);    
    
    return (
        <>        
            <Label text={label} />
            <div className={style.typeBox}>
                {                    
                    ingredientsData.map((element, index) => {
                        const id = String(index)+element._id;
                        if(element.type === type)
                            return (<CatalogItem key={id} ingredientData={element} />);
                    })}
            </div>        
        </>
    )
}

ItemsBlock.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['bun', 'sauce', 'main']).isRequired,
}