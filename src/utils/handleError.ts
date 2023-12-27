export function handleError(error: any) {
    if(Object.hasOwn(error, 'message')) {
        console.log(error.message);
    } else {
        console.log(error);
        throw new Error("Ошибка!");
    }
}