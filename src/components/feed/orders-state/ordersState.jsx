import StatePanel from './state-panel/statePanel';
import style from './orderState.module.css'
import StateStat from './state-stat/stateStat';
import PropTypes from 'prop-types'

export default function OrderState({amounts}) {

return (
    <section className={style.container}>
        <StatePanel />
        <StateStat label={'Выполнено за всё время:'} amount={amounts.all} />
        <StateStat label={'Выполнено за сегодня:'} amount={amounts.today}/>
    </section>
)}

OrderState.propTypes = {
    amounts: PropTypes.shape({
        all: PropTypes.number,
        today: PropTypes.number,
    })
}