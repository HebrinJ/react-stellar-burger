import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './orderCard.module.css'
import OrderItemsFeed from './order-items-feed/orderItemsFeed'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { FEED_ID } from '../../../utils/routes'
import { MODAL_ORDER_INFO } from '../../../services/actions/modal-actions'
import parseDate from '../../../utils/parse-date'
import calculatePrice from '../../../utils/calculatePrice'

export default function OrderCard({order}) {

const {number, createdAt: date, name, ingredients, status } = order;

const location = useLocation();
const dispatch = useDispatch();
const allIngredients = useSelector(state => state.loading.allIngredients)
let statusColor = { color: '#fff' };

function showStatus() {
    switch (status) {
        case 'done':
            statusColor.color = '#00cccc';
            return 'Готов';
        case 'pending':
            statusColor.color = '#fff';  
            return 'Готовится';
        case 'created':
            statusColor.color = '#fff';  
            return 'Создан';    
        default:
            return '';
    }
}

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
            {/* <p className={`text text_type_main-default text_color_inactive ${style.date}`}>{parseDate(date)}</p> */}
            <FormattedDate className={`text text_type_main-default text_color_inactive ${style.date}`} date={new Date(date)} />            
        </div>
        <div className={style.statusBox}>
            <p className='text text_type_main-medium'>{name}</p>
            { status !== '' && <p className='text text_type_main-small' style={statusColor}>{showStatus()}</p>}
        </div>
        <div className={style.infoBox}>
            <div className={style.iconBox}>
                { ingredients?.map((id, index) => {
                    if(id === null) return;
                    
                    const key = String(index)+id;

                    if(index === 5 && ingredients.length !== 6) {
                        const number = ingredients.length - 6;
                        return <OrderItemsFeed id={id} position={ingredients.length - index} number={`+${number.toString()}`} key={key}/>
                    }

                    if (index > 5) return;

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