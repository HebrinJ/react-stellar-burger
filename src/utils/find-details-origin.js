
/*
Утилита будет удалена после завершения тестирования
*/

export function getLocalModalState() {
    let state = localStorage.getItem('ingrOpen');

    if(state === null) {
        setLocalModalState('modalIsClose');
        return false;
    } else if (state === '') {
        return false;
    } else if (state === 'modalIsOpen') {
        return true;
    }

    return false;
}

export function setLocalModalState(value) {
    localStorage.setItem('ingrOpen', value);
}