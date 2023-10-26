const config = {
    baseUrl: `https://norma.nomoreparties.space/api/`,
    headers: {
        authorization: "020effc4-1211-4deb-93d9-11a33dcdf1a5",
        "Content-Type": "application/json",
    },
};

export function getData() {
    return request('ingredients');
}

export function makeOrder(ingredients) {
    
    return request('orders', {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({"ingredients": ingredients})
    });
}

function checkResponse(result) {
    if (result.ok) {
        return result.json();
    }
    return Promise.reject(`Ошибка ${result.status}`);
}

function request(endPoint, settings) {
    return fetch(config.baseUrl+endPoint, settings).then(result => checkResponse(result));
}

export function forgotReset(email) {
    return request('password-reset', {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({'email': email})
    })
}

export function passwordReset(password, code) {
    return request('password-reset/reset', {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({'password': password, 'token': code})
    })
}

export function registration(email, password, name) {
    return request('auth/register', {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({'email': email, 'password': password, 'name': name})
    })
}