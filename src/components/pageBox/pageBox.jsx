import AppHeader from "../app-header/appHeader"
import style from './pageBox.module.css'

export default function PageBox(props) {

    return (
        <div className={style.container}>
            {/* <AppHeader /> */}
            {props.children}
        </div>
    )
}