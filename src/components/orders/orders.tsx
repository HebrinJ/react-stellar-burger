import { useEffect } from 'react';
import OrderCard from './order-card/order-card';
import { useDispatch, useSelector } from '../../utils/hooks';
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

export default function Orders({socketUrl, numberOfOrdersSetter, isPersonal}: TOrdersSettings): JSX.Element {

const userOrdersData = useSelector(state => state.userOrders.data);
const allOrdersData = useSelector(state => state.orders.data);

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
}, [allOrdersData, userOrdersData])

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