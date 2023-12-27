import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from '../draggable-ingredient/draggable-ingredient.module.css'
import { useDispatch, useSelector } from '../../../utils/hooks';
import { STOP_MOVE } from '../../../services/actions/cart-actions';
import { Identifier } from 'dnd-core';
import { TIngredient } from '../../../utils/types-description';

export type TDragObject = {
  id: string,
  index: number,
}

type TDragCollectedProps = {
  isDragging: boolean,
}

type TDropCollectedProps = {
  handlerId: Identifier | null,
}

export type TDraggableIngredientProps = {
  productData: TIngredient;
  index: number;
  handleClose: (id: string) => void;
  moveProduct: (dragIndex: number, hoverIndex: number) => void;
}

export default function DraggableIngredient({ productData, index, handleClose, moveProduct }: TDraggableIngredientProps): JSX.Element {

  const productItem = useRef<HTMLUListElement>(null)

  const tmpIndex = useSelector(state => state.cart.isDragging);
  const dispatch = useDispatch();

  const [{ handlerId }, drop] = useDrop<TDragObject, unknown, TDropCollectedProps>({
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

      const hoverBoundingRect = productItem.current?.getBoundingClientRect();

      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      const clientOffset = monitor.getClientOffset()

      const hoverClientY = clientOffset!.y - hoverBoundingRect.top

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
  const opacity = index === tmpIndex ? 0.2 : 1

  const [{isDragging}, drag] = useDrag<TDragObject, unknown, TDragCollectedProps>({
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
  
  function handleClickRemove() {
    handleClose(id);
  }

  drag(drop(productItem))

  return (
    <ul className={style.ingredient} style={{ opacity }} ref={productItem} data-handler-id={handlerId}>
      <DragIcon type='primary' />
      <ConstructorElement text={productData?.name} price={productData?.price} thumbnail={productData?.image} handleClose={handleClickRemove} />
    </ul>
  );
}