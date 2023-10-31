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
        body: JSON.stringify({ "ingredients": ingredients })
    });
}

function checkResponse(result) {
    if (result.ok) {
        return result.json();
    }
    return Promise.reject(`Ошибка ${result.status}`);
}

function request(endPoint, settings) {
    return fetch(config.baseUrl + endPoint, settings).then(result => checkResponse(result)).catch((err) => {
        if(err.message === 'jwt expired') {
            refreshToken(localStorage.getItem('refreshToken')).then(result => {
                const data = result.json();
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                request(endPoint, settings);
            })
        } else { 
            return Promise.reject(err); 
        }
    });
}

export function forgotReset(email) {
    return request('password-reset', {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({ 'email': email })
    })
}

export function passwordReset(password, code) {
    return request('password-reset/reset', {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({ 'password': password, 'token': code })
    })
}

export function registration(email, password, name) {
    return request('auth/register', {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({ 'email': email, 'password': password, 'name': name })
    })
}

export function authorization(email, password) {
    return request('auth/login', {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({ 'email': email, 'password': password })
    })
}

export function logout() {
    return request('auth/logout', {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({ 'token': localStorage.getItem('refreshToken') })
    })
}

export function refreshToken() {
    return request('auth/token', {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({ 'token': localStorage.getItem('refreshToken') })
    })
}

export function getUserData() {
    return request('auth/user', {
        method: 'GET',
        headers: config.headers,
        authorization: localStorage.getItem('accessToken'),
    });
}

export function updateUserData(email, userName) {
    return request('auth/user', {
        method: 'PATCH',
        headers: config.headers,
        authorization: localStorage.getItem('accessToken'),
        body: JSON.stringify({
            user: {
                name: userName,
                email: email,
            }
        })
    });
}

// export const refreshToken = () => { 
//     return fetch(`${BURGER_API_URL}/auth/token`, 
//     { method: "POST",
//      headers: { "Content-Type": "application/json;charset=utf-8", },
//       body: JSON.stringify({ token: localStorage.getItem("refreshToken"),
//      }),
//      }).then(checkReponse); };

// export const fetchWithRefresh = async (url, options) => {
//     try { 
//         const res = await fetch(url, options);
//         return await checkReponse(res);
//      } catch (err) {
//         if (err.message === "jwt expired") {
//             const refreshData = await refreshToken(); //обновляем токен
//             if (!refreshData.success) { 
//                 return Promise.reject(refreshData);
//              } 
             
//              localStorage.setItem("refreshToken", refreshData.refreshToken);
//               localStorage.setItem("accessToken", refreshData.accessToken);
//                options.headers.authorization = refreshData.accessToken;
//                 const res = await fetch(url, options); //повторяем запрос 
//             return await checkReponse(res);
//         } else { return Promise.reject(err); }
//     }
// }; 