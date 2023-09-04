
function LoadingError({errorText, label}) {

    return (
        <>
            <h1 className='text text_type_main-large'>{label}</h1>
            <p className='text text_type_main-medium'>{errorText}</p>
        </>
    )
}

export default LoadingError