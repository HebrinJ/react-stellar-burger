import PropTypes from 'prop-types';
import { useSelector } from '../../../utils/hooks';
import type { TOrderLoadingError } from '../../../services/reducers/modal-reducer';

// type TLoadingErrorProps = {
//     errorText: string;
//     label: string;
// }

//export default function LoadingError({errorText, label}: TLoadingErrorProps): JSX.Element {
export default function LoadingError(): JSX.Element {
    
    const label: string = 'Ошибка загрузки';
    const modal = useSelector(state => state.modal);

    return (
        <>
            <h1 className='text text_type_main-large'>{label}</h1>
            <p className='text text_type_main-medium'>{modal.modalSettings.orderLoadingError?.message}</p>
        </>
    )
}

// LoadingError.propTypes = {
//     label: PropTypes.string.isRequired,
//     errorText: PropTypes.string,
// }