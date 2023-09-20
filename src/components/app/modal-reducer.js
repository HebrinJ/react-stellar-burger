
export default function modalReducer(state, action) {

    switch (action.type) {
        case 'order':
            return {visible: true, type: 'order', modalData: action.payload}
        case 'info':
            return {visible: true, type: 'info', modalData: action.payload} 
        case 'loadingError':
            return {visible: true, type: 'loadingError', modalData: action.payload}
        case 'close':
            return {visible: false, type: '', modalData: {}}
        default:
            return state;
    }
}