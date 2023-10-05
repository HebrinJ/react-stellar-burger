import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from '../burger-constructor.module.css';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { STOP_MOVE } from '../../../services/actions/cart-actions';


// Исправить подключение стилей на отдельный модуль
export default function DraggableIngredient({productData, ingredientId, index, handleClose, moveProduct}) {

  const productItem = useRef(null)
  
  const tmpIndex = useSelector(state => state.cart.isDragging);
  const dispatch = useDispatch();

  const [{ handlerId }, drop] = useDrop({
    accept: "element",
    drop() {
        dispatch({
            type: STOP_MOVE
        })
    },
    collect(monitor) {        
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      
      setTimeout(() => {
        if (!productItem.current) {
            return
        }
        const dragIndex = item.index
        const hoverIndex = index        
        
        if (dragIndex === hoverIndex) {
            return
        }
        
        const hoverBoundingRect = productItem.current?.getBoundingClientRect()
        
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
        
        const clientOffset = monitor.getClientOffset()
        
        const hoverClientY = clientOffset.y - hoverBoundingRect.top
        
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return
        }
        
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return
        }
        
        moveProduct(dragIndex, hoverIndex);
        
        item.index = hoverIndex
        },10)
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: "element",
    item: () => {
      return { ingredientId, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = index === tmpIndex ? 0 : 1
  
  drag(drop(productItem))
    
    return <ul className={style.ingredient} style={{ opacity }} ref={productItem} data-handler-id={handlerId}> 
            <DragIcon type='primary'/>
            <ConstructorElement text={productData?.name} price={productData?.price} thumbnail={productData?.image} handleClose={handleClose}/>
        </ul>
    
}