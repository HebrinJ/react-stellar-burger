
export default function cartReducer(state, action) {
    switch (action.type) {
        case 'addBun':
            return {...state, bun: action.payload}
        case 'add':
            return {...state, ingredients: [...state.ingredients, action.payload]} 
        case 'remove':
            const elementIndex = state.ingredients.findIndex(id => id === action.payload);           
            state.ingredients.splice(elementIndex, 1);            
            return {...state, ingredients: [...state.ingredients]}
        default:
            return state;
    }
}