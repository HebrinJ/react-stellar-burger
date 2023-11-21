import { useEffect } from 'react';
import OrderCard from './order-card/orderCard';
import { webSocketConnect, webSocketClose } from '../../utils/use-socket';
import { useDispatch, useSelector } from 'react-redux';
import { GET_ORDERS } from '../../services/actions/all-orders-actions';
import { GET_USER_ORDERS } from '../../services/actions/user-orders-actions';
import PropTypes from 'prop-types';
import style from './orders.module.css';

export default function Orders({socketUrl, numberOfOrdersSetter, isPersonal}) {

const orders = useSelector(state => state.orders.orders)
const userOrders = useSelector(state => state.userOrders.orders)
const dispatch = useDispatch();

useEffect(() => {
    const connection = webSocketConnect(socketUrl);
    connection.onmessage = event => {
        const data = JSON.parse(event.data);

        prepareDataToShow(data);

        if(isPersonal) {
            dispatch({
                type: GET_USER_ORDERS,
                payload: data,
            })
        } else {
            dispatch({
                type: GET_ORDERS,
                payload: data,
            })
        }
        
    }

    return (() => {
        webSocketClose(connection);
    })
}, [socketUrl, isPersonal, orders])

function prepareDataToShow(data) {

        if(numberOfOrdersSetter) {
            numberOfOrdersSetter({all: data.total, today: data.totalToday});
        }      
    };

return (
    <div className={`${style.container} custom-scroll`}>
        { isPersonal ? userOrders?.map((order, index) => {
            const id = String(index)+order._id;
            return <OrderCard order={order} key={id}/>
        }) :
        orders?.map((order, index) => {
            const id = String(index)+order._id;
            return <OrderCard order={order} key={id}/>
        })}
    </div>
)}

Orders.propTypes = {
    socketUrl: PropTypes.string.isRequired,
    numberOfOrdersSetter: PropTypes.func,
    isPersonal: PropTypes.bool,
}