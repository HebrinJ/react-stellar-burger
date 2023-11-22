import { useEffect } from 'react';
import OrderCard from './order-card/orderCard';
import { webSocketConnect, webSocketClose, webSocketStatus } from '../../utils/use-socket';
import { useDispatch, useSelector } from 'react-redux';
import { GET_ORDERS } from '../../services/actions/all-orders-actions';
import { GET_USER_ORDERS } from '../../services/actions/user-orders-actions';
import PropTypes from 'prop-types';
import style from './orders.module.css';
import { connect, disconnect } from '../../services/actions/all-orders-actions';
import { connect as userFeedConnect, disconnect as userFeedDisconnect } from '../../services/actions/user-orders-actions';

export default function Orders({socketUrl, numberOfOrdersSetter, isPersonal}) {

const { userData } = useSelector(state => state.userOrders)
const { data } = useSelector(state => state.orders);
//const isDisconnect = status !== webSocketStatus.ONLINE;

const dispatch = useDispatch();

useEffect(() => {

    if(isPersonal) {
        dispatch(userFeedConnect(socketUrl));
    } else {
        dispatch(connect(socketUrl));
        prepareDataToShow(data);
    }

    return (() => {
        isPersonal ? dispatch(userFeedDisconnect()) : dispatch(disconnect())
    })
}, [])

function prepareDataToShow(data) {

        if(numberOfOrdersSetter) {
            numberOfOrdersSetter({all: data.total, today: data.totalToday});
        }      
    };

return (
    <div className={`${style.container} custom-scroll`}>
        { isPersonal ? userData.orders?.map((order, index) => {
            const id = String(index)+order._id;
            return <OrderCard order={order} key={id}/>
        }) :
        data.orders?.map((order, index) => {
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