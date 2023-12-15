import { useSelector } from '../../../../utils/hooks';
import { TOrder, TOrdersData } from '../../../../utils/use-socket';
import style from './statePanel.module.css'

export default function StatePanel() {

const orders = useSelector(state => state.orders.data?.orders)

const ready = orders?.filter((order: TOrder, index: number) => {
    if(order.status === 'done' && index <= 19) {
        return order.number;
    }
})

const inProgress = orders?.filter((order: TOrder, index: number) => {
    if(order.status === 'pending' && index <= 19) {
        return order.number;
    }
})

return (
    <section className={style.container}>
        <div className={style.column}>
            <h2 className={`text text_type_main-medium ${style.label}`}>Готовы: </h2>
            <div className={style.numberBox}>
                { ready?.map((order) => {
                    const id = order.number;
                    return <p className={`text text_type_digits-default ${style.ready}`} key={id}>{order.number}</p>
                })}
            </div>
        </div>
        <div className={style.column}>
            <h2 className={`text text_type_main-medium ${style.label}`}>В работе: </h2>
            <div className={style.numberBox}>
                { inProgress?.map((order) => {
                    const id = order.number;
                    return <p className={`text text_type_digits-default`} key={id}>{order.number}</p>
                })}
            </div>
        </div>
    </section>
)}