import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from '../draggable-ingredient/draggable-ingredient.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { STOP_MOVE } from '../../../services/actions/cart-actions';
import PropTypes from 'prop-types';

export default function DraggableIngredient({ productData, index, handleClose, moveProduct }) {

  const productItem = useRef(null)

  const tmpIndex = useSelector(state => state.cart.isDragging);
  const dispatch = useDispatch();

  const [{ handlerId }, drop] = useDrop({
    accept: "element",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
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

    },
  })

  const id = productData._id;

  const [, drag] = useDrag({
    type: "element",
    item: () => {
      return { id, index }
    },
    end() {
      dispatch({
        type: STOP_MOVE
      })
    },
  })

  const opacity = index === tmpIndex ? 0.2 : 1


  drag(drop(productItem))

  return (
    <ul className={style.ingredient} style={{ opacity }} ref={productItem} data-handler-id={handlerId}>
      <DragIcon type='primary' />
      <ConstructorElement text={productData?.name} price={productData?.price} thumbnail={productData?.image} handleClose={handleClose} />
    </ul>
  );

}

DraggableIngredient.propTypes = {
  productData: PropTypes.shape({name: PropTypes.string, price: PropTypes.number, imgae: PropTypes.string}).isRequired,
  index: PropTypes.number.isRequired,
  handleClose: PropTypes.func.isRequired,
  moveProduct: PropTypes.func.isRequired,
}