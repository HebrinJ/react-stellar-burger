
export default function calculatePrice(allIngredients, currentIngredients) {
    const price = currentIngredients.reduce((sum, product) => {
        
        const details = allIngredients.find(productDetails => productDetails._id === product);
        
        if(details === undefined) return sum;
        
        return sum + details.price;
    }, 0)

    return price;
}