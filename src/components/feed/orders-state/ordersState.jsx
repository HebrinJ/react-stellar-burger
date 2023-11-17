import StatePanel from "./state-panel/statePanel";
import style from './orderState.module.css'
import StateStat from "./state-stat/stateStat";

export default function OrderState({amounts, orders}) {

return (
    <div className={style.container}>
        <StatePanel orders={orders}/>
        <StateStat label={'Выполнено за всё время:'} amount={amounts.all} />
        <StateStat label={'Выполнено за сегодня:'} amount={amounts.today}/>
    </div>
)}