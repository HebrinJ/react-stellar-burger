import React from 'react'
import style from './modal-overlay.module.css';

function ModalOverlay(props) {

    React.useEffect(() => {
        document.addEventListener('keydown', handleKey);
        
        return () => {
            document.removeEventListener('keydown', handleKey);
        }        
    }, [])

    const handleClick = (e) => {
        props.handleCloseModal();
    }

    const handleKey = (e) => {
        if(e.key === 'Escape') {
            props.handleCloseModal();
        }
    }

    return (
        <div className={style.overlay} onClick={handleClick}>

        </div>
    )
}

export default ModalOverlay;