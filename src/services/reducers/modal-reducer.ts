import { TIngredient, TOrderData, TOrderDetails } from "../../utils/typesDescription";
import { MODAL_ORDER, MODAL_INGR_INFO, MODAL_LOADING_ERROR, MODAL_CLOSE, MODAL_ORDER_INFO } from "../actions/modal-actions"
import { TModalActions } from "../actions/modal-actions"

type TModalState = {
    visible: boolean;
    type: string;
    modalSettings: TModalSettings;
}

const initialState: TModalState = {
    visible: false, 
    type: '',
    modalSettings: {
        orderSettings: null,
        orderInfo: null,
        orderLoadingError: null,
        ingredientInfo: null,
    },
}

export type TOrderSettings = {
    orderNum: number;
};

export type TOrderLoadingError = {
    message: string;
};

type TModalSettings = {
    orderSettings: TOrderSettings | null;
    orderInfo: TOrderDetails | null;
    orderLoadingError: TOrderLoadingError | null;
    ingredientInfo: TIngredient | null;
}

//export type TOrderInfo = TOrderData;

//export type TIngredientInfo = TIngredient;

export default function modalReducer(state = initialState, action: TModalActions): TModalState {
    
    switch (action.type) {
        case MODAL_ORDER:
            return {visible: true, type: 'order', modalSettings: { orderSettings: action.payload, orderInfo: null, orderLoadingError: null, ingredientInfo: null }}
        case MODAL_INGR_INFO:
            return {visible: true, type: 'info', modalSettings: { orderSettings: null, orderInfo: null, orderLoadingError: null, ingredientInfo: action.payload }}
        case MODAL_ORDER_INFO:
            return {visible: true, type: 'order-info', modalSettings: { orderSettings: null, orderInfo: action.payload, orderLoadingError: null, ingredientInfo: null }} 
        case MODAL_LOADING_ERROR:
            return {visible: true, type: 'loadingError', modalSettings: { orderSettings: null, orderInfo: null, orderLoadingError: action.payload, ingredientInfo: null }}
        case MODAL_CLOSE:
            return {visible: false, type: '', modalSettings: { orderSettings: null, orderInfo: null, orderLoadingError: null, ingredientInfo: null }}
        default:
            return state;
    }
}
