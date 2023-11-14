import style from './orderItemsFeed.module.css'

export default function OrderItemsFeed({position}) {    

return (
    <div className={style.icon} style={{zIndex: `${position}`}}>
        <img className={style.image} src="https://code.s3.yandex.net/react/code/bun-02-mobile.png" />
    </div>
)}