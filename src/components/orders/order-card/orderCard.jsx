import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderItemsFeed from './order-items-feed/orderItemsFeed';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { MODAL_ORDER_INFO } from '../../../services/actions/modal-actions';
import calculatePrice from '../../../utils/calculatePrice';
import OrderShowStatus from '../../order-details/order-show-status/orderShowStatus';
import PropTypes from 'prop-types';
import style from './orderCard.module.css';

export default function OrderCard({order}) {

const {number, createdAt: date, name, ingredients, status } = order;

const dispatch = useDispatch();

const location = useLocation();
const allIngredients = useSelector(state => state.loading.allIngredients)

function openModal() { 
    dispatch({
        type: MODAL_ORDER_INFO,
        payload: order,
    })
}  

return (
    <Link to={`${location.pathname}/${number}`} className={style.link} state={{background: location}}>
    <div className={style.container} onClick={openModal}>
        <div className={style.labelBox}>
            <p className={`text text_type_digits-default ${style.orderNumber}`}>{`#${number}`}</p>
            <FormattedDate className={`text text_type_main-default text_color_inactive ${style.date}`} date={new Date(date)} />            
        </div>
        <div className={style.statusBox}>
            <p className='text text_type_main-medium'>{name}</p>
            { status !== '' && <OrderShowStatus status={status} />}
        </div>
        <div className={style.infoBox}>
            <div className={style.iconBox}>
                { ingredients?.map((id, index) => {
                    if(id === null || index > 5) return;

                    const key = String(index) + id;

                    if(index === 5 && ingredients.length !== 6) {
                        const number = ingredients.length - 6;
                        return <OrderItemsFeed id={id} position={ingredients.length - index} number={`+${number}`} key={key}/>
                    }

                    return <OrderItemsFeed id={id} position={ingredients.length - index} key={key}/>
                })}
            </div>            
            <div className={style.priceBox}>
                <p className='text text_type_digits-default'>{calculatePrice(allIngredients, ingredients)}</p>
                <CurrencyIcon type='primary' />
            </div>
        </div>
    </div>
    </Link>
)}

OrderCard.propTypes = {
    order: PropTypes.shape({
        number: PropTypes.number,
        createdAt: PropTypes.string,
        name: PropTypes.string,
        ingredients: PropTypes.array,
        status: PropTypes.string,
    })
}