
type TLabelProps = {
    text: string;
};

function Label({text}: TLabelProps): JSX.Element {
    return (
        <p className="text text_type_main-medium">{text}</p>
    )
}

export default Label;