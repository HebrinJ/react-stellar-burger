import style from './pageBox.module.css'

export default function PageBox(props) {

    return (
        <div className={style.container}>
            {props.children}
        </div>
    )
}