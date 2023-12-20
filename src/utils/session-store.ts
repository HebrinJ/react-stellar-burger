import { RootState } from "..";

export function getSessionStore() {
    const stringData = sessionStorage.getItem('store');
    
    if(stringData === null) {
        return {};
    }

    return JSON.parse(stringData);
}

export function updateSessionStore(store: RootState) {
    sessionStorage.setItem('store', JSON.stringify(store));
}