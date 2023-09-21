
export default function modalReducer(state, action) {

    switch (action.type) {
        case 'order':
            return {visible: true, type: 'order', modalSettings: action.payload}
        case 'info':
            return {visible: true, type: 'info', modalSettings: action.payload} 
        case 'loadingError':
            return {visible: true, type: 'loadingError', modalSettings: action.payload}
        case 'close':
            return {visible: false, type: '', modalSettings: {}}
        default:
            return state;
    }
}