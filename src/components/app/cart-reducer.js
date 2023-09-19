
export default function cartReducer(state, action) {
    switch (action.type) {
        case 'addBun':
            return {...state, bun: action.payload}
        case 'add':
            return {...state, ingredients: [...state.ingredients, action.payload]} 
        case 'remove':
            return {...state, ingredients: state.ingredients.filter(id => id !== action.payload)}
        default:
            return state;
    }
}