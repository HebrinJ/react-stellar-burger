import style from './order-accept.module.css'
import done from '../../../images/done.png'
import PropTypes from 'prop-types';

export default function OrderAccept({orderNum}) {

    return (
        <div className={style.position}>
            <p className={style.order+' text text_type_digits-large'}>{orderNum}</p>
            <p className={style.orderNum+' text text_type_main-medium'}>Идентификатор заказа</p>
            <img className={style.image} src={done} alt='Галочка'></img>
            <p className={style.readyInfo+ ' text text_type_main-small'}>Ваш заказ начали готовить</p>
            <p className={style.waitText+ ' text text_type_main-default text_color_inactive'}>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

OrderAccept.propTypes = {
    orderNum: PropTypes.number.isRequired,
}