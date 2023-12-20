import { useEffect } from 'react';
import OrderCard from './order-card/orderCard';
//import { webSocketConnect, webSocketClose, webSocketStatus } from '../../utils/use-socket';
import { useDispatch, useSelector } from '../../utils/hooks';
//import { GET_ORDERS } from '../../services/actions/all-orders-actions';
//import { GET_USER_ORDERS } from '../../services/actions/user-orders-actions';
import PropTypes from 'prop-types';
import style from './orders.module.css';
import { connect, disconnect } from '../../services/actions/all-orders-actions';
import { connect as userFeedConnect, disconnect as userFeedDisconnect } from '../../services/actions/user-orders-actions';
import { TOrder, TOrdersData } from '../../utils/use-socket';

type TOrdersQuantityObject = {
    all: number;
    today: number;
}

type TOrdersSettings = {
    socketUrl: string;
    numberOfOrdersSetter?: (object: TOrdersQuantityObject) => void;
    isPersonal: boolean;
}

export default function Orders({socketUrl, numberOfOrdersSetter, isPersonal}: TOrdersSettings) {

const userOrdersData = useSelector(state => state.userOrders.data);
const allOrdersData = useSelector(state => state.orders.data);
//const isDisconnect = status !== webSocketStatus.ONLINE;

const dispatch = useDispatch();

useEffect(() => {
    
    if(isPersonal) {
        dispatch(userFeedConnect(socketUrl));
    } else {
        dispatch(connect(socketUrl));        
        prepareDataToShow(allOrdersData);
    }

    return (() => {
        isPersonal ? dispatch(userFeedDisconnect()) : dispatch(disconnect())
    })
}, [])

const currentOrders = isPersonal ? userOrdersData : allOrdersData;

function prepareDataToShow(data: TOrdersData | null): void {
    
    if(data && numberOfOrdersSetter) {
        numberOfOrdersSetter({all: data.total, today: data.totalToday});
    }      
};

return (
    <div className={`${style.container} custom-scroll`}>
        { currentOrders?.orders.map((order: TOrder) => {         
            return <OrderCard order={order} key={order.number}/>
        })}
    </div>
)}

// Orders.propTypes = {
//     socketUrl: PropTypes.string.isRequired,
//     numberOfOrdersSetter: PropTypes.func,
//     isPersonal: PropTypes.bool,
// }