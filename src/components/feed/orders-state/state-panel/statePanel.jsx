import style from './statePanel.module.css'

export default function StatePanel() {

return (
    <div className={style.container}>
        <div className={style.column}>
            <h2 className={`text text_type_main-medium ${style.label}`}>Готовы: </h2>
            <div className={style.numberBox}>
                <p className={`text text_type_digits-default ${style.ready}`}>034533</p>
                <p className={`text text_type_digits-default ${style.ready}`}>034534</p>
                <p className={`text text_type_digits-default ${style.ready}`}>034535</p>
                <p className={`text text_type_digits-default ${style.ready}`}>034531</p>
                <p className={`text text_type_digits-default ${style.ready}`}>034532</p>
                <p className={`text text_type_digits-default ${style.ready}`}>034530</p>
            </div>
        </div>
        <div className={style.column}>
            <h2 className={`text text_type_main-medium ${style.label}`}>В работе: </h2>
            <div className={style.numberBox}>
                <p className='text text_type_digits-default'>034536</p>
                <p className='text text_type_digits-default'>034537</p>
                <p className='text text_type_digits-default'>034538</p>
            </div>
        </div>
    </div>
)}