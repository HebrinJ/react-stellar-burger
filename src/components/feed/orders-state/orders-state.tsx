import StatePanel from './state-panel/state-panel';
import style from './order-state.module.css'
import StateStat from './state-stat/state-stat';

type TOrderStateProps = {
    amounts: TAmountProps,
}

type TAmountProps = {
    all: number,
    today: number,
}

export default function OrderState({amounts}: TOrderStateProps): JSX.Element {

return (
    <section className={style.container}>
        <StatePanel />
        <StateStat label={'Выполнено за всё время:'} amount={amounts.all} />
        <StateStat label={'Выполнено за сегодня:'} amount={amounts.today}/>
    </section>
)}