import PropTypes from 'prop-types';

export default function OrderShowStatus({status}) {

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

OrderShowStatus.propTypes = {
    status: PropTypes.string,
}