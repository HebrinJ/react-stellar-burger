import style from './modal-overlay.module.css';

function ModalOverlay(props) {

    return (
        <div className={style.overlay} onClick={props.handleCloseModal}>

        </div>
    )
}

export default ModalOverlay;