import StatePanel from './state-panel/statePanel';
import React from 'react';
import style from './orderState.module.css'
import StateStat from './state-stat/stateStat';
import PropTypes from 'prop-types'

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

OrderState.propTypes = {
    amounts: PropTypes.shape({
        all: PropTypes.number,
        today: PropTypes.number,
    })
}