import { TIngredient } from "./types-description";

export default function calculatePrice(allIngredients: ReadonlyArray<TIngredient>, currentIngredients: ReadonlyArray<string>): number {
    const price = currentIngredients.reduce((sum, product) => {
        
        const details = allIngredients.find(productDetails => productDetails._id === product);
        
        if(details === undefined) return sum;
        
        return sum + details.price;
    }, 0)

    return price;
}