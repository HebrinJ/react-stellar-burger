import style from './modal-overlay.module.css';

type TModalOverlayProp = {
    handleCloseModal: () => void;
}

export default function ModalOverlay({handleCloseModal}: TModalOverlayProp) {

    return (
        <div className={style.overlay} onClick={handleCloseModal}>

        </div>
    )
}