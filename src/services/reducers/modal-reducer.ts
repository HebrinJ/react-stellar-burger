import { MODAL_ORDER, MODAL_INGR_INFO, MODAL_LOADING_ERROR, MODAL_CLOSE, MODAL_ORDER_INFO } from "../actions/modal-actions"
import { TModalActions } from "../actions/modal-actions"

type TModalState = {
    visible: boolean;
    type: string;
    modalSettings: object;
}

const initialState: TModalState = {
    visible: false, 
    type: '',
    modalSettings: {},
}


export default function modalReducer(state = initialState, action: TModalActions) {

    switch (action.type) {
        case MODAL_ORDER:
            return {visible: true, type: 'order', modalSettings: action.data}
        case MODAL_INGR_INFO:
            return {visible: true, type: 'info', modalSettings: action.data}
        case MODAL_ORDER_INFO:
            return {visible: true, type: 'order-info', modalSettings: action.data} 
        case MODAL_LOADING_ERROR:
            return {visible: true, type: 'loadingError', modalSettings: action.data}
        case MODAL_CLOSE:
            return {visible: false, type: '', modalSettings: {}}
        default:
            return state;
    }
}