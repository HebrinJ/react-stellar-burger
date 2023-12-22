import { useSelector } from '../../../utils/hooks';

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