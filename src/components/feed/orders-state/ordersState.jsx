import StatePanel from "./state-panel/statePanel";
import style from './orderState.module.css'
import StateStat from "./state-stat/stateStat";

export default function OrderState() {

return (
    <div className={style.container}>
        <StatePanel />
        <StateStat label={'Выполнено за всё время:'} amount={'28752'} />
        <StateStat label={'Выполнено за сегодня:'} amount={'138'}/>
    </div>
)}