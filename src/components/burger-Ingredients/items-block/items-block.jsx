import PropTypes from 'prop-types'
import Label from './label/label.jsx'
import style from './items-block.module.css'
import CatalogItem from '../catalog-item/catalog-item.jsx'

function ItemsBlock({label, type, data, clickHandler, cart}) {
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
                        clickHandler={clickHandler} 
                        cart={cart} 
                        type={type}/>
                    })}
            </div>        
        </>
    )
}

ItemsBlock.propTypes = {
    label: PropTypes.string,
    type: PropTypes.oneOf(['bun', 'sauce', 'main']),
    data: PropTypes.arrayOf(PropTypes.object),
    clickHandler: PropTypes.func,
    cart: PropTypes.arrayOf(PropTypes.object),
}

export default ItemsBlock