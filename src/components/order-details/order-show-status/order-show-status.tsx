type TOrderShowStatusProps = {
    status: '' | 'done' | 'pending' | 'created';
}

export default function OrderShowStatus({status}: TOrderShowStatusProps): JSX.Element {

let statusColor = { color: '#fff' };

function showStatus() {
    switch (status) {
        case 'done':
            statusColor.color = '#00cccc';
            return 'Готов';
        case 'pending':
            statusColor.color = '#fff';  
            return 'Готовится';
        case 'created':
            statusColor.color = '#fff';  
            return 'Создан';    
        default:
            return '';
    }
}

return (
    <p className='text text_type_main-small' style={statusColor}>{showStatus()}</p>
)}