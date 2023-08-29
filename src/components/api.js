const config = {
    baseUrl: `https://norma.nomoreparties.space/api/ingredients`,
    headers: {
        authorization: "020effc4-1211-4deb-93d9-11a33dcdf1a5",
        "Content-Type": "application/json",
    },
};

export function getData() {
    return request();
}

function checkResponse(result) {
    if (result.ok) {
        return result.json();
    }
    return Promise.reject(`Ошибка ${result.status}`);
}

function request() {
    return fetch(config.baseUrl).then(result => checkResponse(result));
}