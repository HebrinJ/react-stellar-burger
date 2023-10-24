import PropTypes from 'prop-types';

export default function LoadingError({errorText, label}) {

    return (
        <>
            <h1 className='text text_type_main-large'>{label}</h1>
            <p className='text text_type_main-medium'>{errorText}</p>
        </>
    )
}

LoadingError.propTypes = {
    label: PropTypes.string.isRequired,
    errorText: PropTypes.string,
}