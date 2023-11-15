import style from './orderDetails.module.css'

export default function OrderDetails() {

return (
    <div className={style.container}>
        <p>#034568</p>
        <p>Black Hole Singularity острый бургер</p>
        <p>Выполнен</p>
        <div>
            <p>Состав:</p>
            <ul>
                <li>Ингредиент</li>
                <li>Ингредиент</li>
            </ul>
            <div>
                <p>Время</p>
                <p>Цена</p>
            </div>
        </div>
    </div>
)}