import style from './statePanel.module.css'

export default function StatePanel({orders}) {

const ready = orders?.filter((order, index) => {
    if(order.state === 'done' && index <= 19) {
        return order.number;
    }
})

const inProgress = orders?.filter((order, index) => {
    if(order.state === 'pending' && index <= 19) {
        return order.number;
    }
})

return (
    <div className={style.container}>
        <div className={style.column}>
            <h2 className={`text text_type_main-medium ${style.label}`}>Готовы: </h2>
            <div className={style.numberBox}>
                { ready?.map((order) => {
                    return <p className={`text text_type_digits-default ${style.ready}`}>{order.number}</p>
                })}
            </div>
        </div>
        <div className={style.column}>
            <h2 className={`text text_type_main-medium ${style.label}`}>В работе: </h2>
            <div className={style.numberBox}>
                { inProgress?.map((order) => {
                    return <p className={`text text_type_digits-default ${style.ready}`}>{order.number}</p>
                })}
            </div>
        </div>
    </div>
)}