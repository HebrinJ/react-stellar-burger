import { RootState } from "..";

export function getSessionStore(): RootState | {} {
    const stringData = sessionStorage.getItem('store');
    
    if(stringData === null) {
        return {};
    }

    return JSON.parse(stringData);
}

export function updateSessionStore(store: RootState): void {
    sessionStorage.setItem('store', JSON.stringify(store));
}