import AppHeader from "../components/app-header/appHeader";
import style from './loginPage.module.css'
import Login from "../components/login/login";

export default function LoginPage() {

    return (
        <div className={style.main}>
            <AppHeader />
            <Login />
        </div>
    )
}