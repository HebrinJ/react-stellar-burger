import style from './modal-overlay.module.css';
import PropTypes from 'prop-types';

export default function ModalOverlay({handleCloseModal}) {

    return (
        <div className={style.overlay} onClick={handleCloseModal}>

        </div>
    )
}

ModalOverlay.propTypes = {
    handleCloseModal: PropTypes.func.isRequired,
}