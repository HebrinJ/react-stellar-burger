import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './orderCard.module.css'
import OrderItemsFeed from './order-items-feed/orderItemsFeed'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { FEED_ID } from '../../../utils/routes'
import { MODAL_ORDER_INFO } from '../../../services/actions/modal-actions'
import parseDate from '../../../utils/parse-date'
import calculatePrice from '../../../utils/calculatePrice'

export default function OrderCard({order}) {

const {number, createdAt: date, name, ingredients, status, _id: id} = order;

const location = useLocation();
const dispatch = useDispatch();
const allIngredients = useSelector(state => state.loading.allIngredients)
let statusColor = { color: '#fff' };

// function calculatePrice() {
//     const price = ingredients.reduce((sum, product) => {
        
//         const details = allIngredients.find(productDetails => productDetails._id === product);
        
//         if(details === undefined) return sum;
        
//         if(details.type === 'bun') {
//             return sum + (details.price * 2)
//         } else {
//             return sum + details.price;
//         }
//     }, 0)

//     return price;
// }

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

// function setDate() {
//     let dateString = ''
    
//     const timestamp = Date.parse(date);
//     const timestampNow = Date.now();

//     if(timestampNow - timestamp <= 86400000) {
//         dateString = 'Сегодня, '
//     } else if (timestampNow - timestamp > 86400000 && timestampNow - timestamp <= 172800000) {
//         dateString = 'Вчера, '
//     } else {
//         dateString = date.slice(0,10).concat(', ');
//     }

//     const time = date.slice(11, 16);
//     dateString = dateString.concat(time+' ');

//     const utcFull = new Date(timestamp).toUTCString();
//     const utcIndex = utcFull.indexOf('GMT');
//     const utc = utcFull.slice(utcIndex);

//     return dateString.concat(utc);
// }

function openModal() { 
    dispatch({
        type: MODAL_ORDER_INFO,
        payload: order,
    })
}  

return (
    <Link to={`${location.pathname}/${id}`} className={style.link} state={{background: location}}>
    <div className={style.container} onClick={openModal}>
        <div className={style.labelBox}>
            <p className={`text text_type_digits-default ${style.orderNumber}`}>{`#${number}`}</p>
            <p className={`text text_type_main-default text_color_inactive ${style.date}`}>{parseDate(date)}</p>
        </div>
        <div className={style.statusBox}>
            <p className='text text_type_main-medium'>{name}</p>
            { status !== '' && <p className='text text_type_main-small' style={statusColor}>{showStatus()}</p>}
        </div>
        <div className={style.infoBox}>
            <div className={style.iconBox}>
                { ingredients?.map((id, index) => {
                    if(id === null) return;

                    if(index === 5 && ingredients.length !== 6) {
                        const number = ingredients.length - 6;
                        return <OrderItemsFeed id={id} position={ingredients.length - index} number={`+${number.toString()}`}/>
                    }

                    if (index > 5) return;

                    return <OrderItemsFeed id={id} position={ingredients.length - index}/>
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