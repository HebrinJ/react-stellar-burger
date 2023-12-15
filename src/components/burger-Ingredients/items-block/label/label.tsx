import PropTypes from 'prop-types'

type TLabelProps = {
    text: string;
};

function Label({text}: TLabelProps): JSX.Element {
    return (
        <p className="text text_type_main-medium">{text}</p>
    )
}

// Label.propTypes = {
//     text: PropTypes.string.isRequired,
// }

export default Label;