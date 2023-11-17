
export default function calculatePrice(allIngredients, currentIngredients) {
    const price = currentIngredients.reduce((sum, product) => {
        
        const details = allIngredients.find(productDetails => productDetails._id === product);
        
        if(details === undefined) return sum;
        
        if(details.type === 'bun') {
            return sum + (details.price * 2)
        } else {
            return sum + details.price;
        }
    }, 0)

    return price;
}