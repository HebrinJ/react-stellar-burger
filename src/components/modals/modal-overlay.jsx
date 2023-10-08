import style from './modal-overlay.module.css';

export default function ModalOverlay(props) {

    return (
        <div className={style.overlay} onClick={props.handleCloseModal}>

        </div>
    )
}
