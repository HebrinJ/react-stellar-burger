import PropTypes from 'prop-types';
import Label from './label/label.jsx';
import style from './items-block.module.css';
import CatalogItem from '../catalog-item/catalog-item.jsx';

function ItemsBlock({label, type, data, handleOpenModal, cart}) {
    return (
        <>        
            <Label text={label} />
            <div className={style.typeBox}>
                {                    
                    data.map((element, index) => {                    
                        if(element.type === type)
                    return <CatalogItem 
                        key={index} 
                        image={element.image} 
                        name={element.name} 
                        price={element.price} 
                        _id={element._id} 
                        handleOpenModal={handleOpenModal} 
                        cart={cart} 
                        type={type}
                        data={data}/>
                    })}
            </div>        
        </>
    )
}

ItemsBlock.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['bun', 'sauce', 'main']).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleOpenModal: PropTypes.func.isRequired,
    cart: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default ItemsBlock