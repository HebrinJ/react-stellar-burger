import style from './modal-overlay.module.css';
import PropTypes from 'prop-types';

type TModalOverlayProp = {
    handleCloseModal: () => void;
}

export default function ModalOverlay({handleCloseModal}: TModalOverlayProp) {

    return (
        <div className={style.overlay} onClick={handleCloseModal}>

        </div>
    )
}

ModalOverlay.propTypes = {
    handleCloseModal: PropTypes.func.isRequired,
}