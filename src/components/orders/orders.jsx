import { useEffect } from 'react';
import OrderCard from './order-card/orderCard';
import { webSocketConnect, webSocketClose, webSocketStatus } from '../../utils/use-socket';
import { useDispatch, useSelector } from 'react-redux';
import { GET_ORDERS } from '../../services/actions/all-orders-actions';
import { GET_USER_ORDERS } from '../../services/actions/user-orders-actions';
import PropTypes from 'prop-types';
import style from './orders.module.css';
import { connect, disconnect } from '../../services/actions/all-orders-actions';

export default function Orders({socketUrl, numberOfOrdersSetter, isPersonal}) {

//const orders = useSelector(state => state.orders.orders)
//const userOrders = useSelector(state => state.userOrders.orders)
const { data: orders, status } = useSelector(state => state.orders);
const isDisconnect = status !== webSocketStatus.ONLINE;

const dispatch = useDispatch();

//const connect = () => dispatch(connect(socketUrl));
//const disconnect = () => dispatch(disconnect());

useEffect(() => {
    // const connection = webSocketConnect(socketUrl);
    // connection.onmessage = event => {
    //     const data = JSON.parse(event.data);

    //     prepareDataToShow(data);

    //     if(isPersonal) {
    //         dispatch({
    //             type: GET_USER_ORDERS,
    //             payload: data,
    //         })
    //     } else {
    //         dispatch({
    //             type: GET_ORDERS,
    //             payload: data,
    //         })
    //     }
    
    // }    
    dispatch(connect(socketUrl));

    prepareDataToShow(orders)


    return (() => {
        dispatch(disconnect());
        //webSocketClose(connection);
    })
}, [])

function prepareDataToShow(data) {

        if(numberOfOrdersSetter) {
            numberOfOrdersSetter({all: data.total, today: data.totalToday});
        }      
    };

return (
    <div className={`${style.container} custom-scroll`}>
        {/* { isPersonal ? userOrders?.map((order, index) => {
            const id = String(index)+order._id;
            return <OrderCard order={order} key={id}/>
        }) : */}
        {/* {orders?.map((order, index) => {
            const id = String(index)+order._id;
            return <OrderCard order={order} key={id}/>
        })} */}
    </div>
)}

Orders.propTypes = {
    socketUrl: PropTypes.string.isRequired,
    numberOfOrdersSetter: PropTypes.func,
    isPersonal: PropTypes.bool,
}