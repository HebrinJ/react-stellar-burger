import AppHeader from "../components/app-header/appHeader";
import style from './registrationPage.module.css';
import Registration from "../components/registration/registration";

export default function RegistrationPage() {

    return (
        <div className={style.main}>
            <AppHeader />
            <Registration />
        </div>
    )
}