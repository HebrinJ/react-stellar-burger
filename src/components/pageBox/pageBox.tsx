import style from './pageBox.module.css'

type TPageBox = {
    children?: React.ReactNode;
}

export default function PageBox(props: TPageBox) {

    return (
        <div className={style.container}>
            {props.children}
        </div>
    )
}