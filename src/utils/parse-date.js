export default function parseDate(date) {
    let dateString = ''
    
    const timestamp = Date.parse(date);
    const timestampNow = Date.now();

    if(timestampNow - timestamp <= 86400000) {
        dateString = 'Сегодня, '
    } else if (timestampNow - timestamp > 86400000 && timestampNow - timestamp <= 172800000) {
        dateString = 'Вчера, '
    } else {
        dateString = date.slice(0,10).concat(', ');
    }

    const time = date.slice(11, 16);
    dateString = dateString.concat(time+' ');

    const utcFull = new Date(timestamp).toUTCString();
    const utcIndex = utcFull.indexOf('GMT');
    const utc = utcFull.slice(utcIndex);

    return dateString.concat(utc);
}