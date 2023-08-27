import PropTypes from 'prop-types'

function Label({text}) {
    return (
        <p className="text text_type_main-medium">{text}</p>
    )
}

Label.propTypes = {
    text: PropTypes.string,
}

export default Label;