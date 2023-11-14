import style from './stateStat.module.css'

export default function StateStat({label, amount}) {    

return (
    <div>
        <h2 className='text text_type_main-medium'>{label}</h2>
        <p className={`text text_type_digits-large ${style.glow}`}>{amount}</p>
    </div>
)}