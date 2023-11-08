
const config = {
    baseUrl: `https://norma.nomoreparties.space/api/`,
    main: {
        //authorization: "020effc4-1211-4deb-93d9-11a33dcdf1a5",
        "Content-Type": "application/json",        
    },
    authorized: {        
        authorization: localStorage.getItem('accessToken'),
        "Content-Type": "application/json",        
    },
};

export function getData() {
    return request('ingredients');
}

export function makeOrder(ingredients) {
    return requestWithRefresh('orders', {
        method: 'POST',
        headers: config.authorized,
        body: JSON.stringify({ 'ingredients': ingredients })
    });
}

export function forgotReset(email) {
    return request('password-reset', {
        method: 'POST',
        headers: config.main,
        body: JSON.stringify({ 'email': email })
    })
}

export function passwordReset(password, code) {
    return request('password-reset/reset', {
        method: 'POST',
        headers: config.main,
        body: JSON.stringify({ 'password': password, 'token': code })
    })
}

export function registration(email, password, name) {
    return request('auth/register', {
        method: 'POST',
        headers: config.main,
        body: JSON.stringify({ 'email': email, 'password': password, 'name': name })
    })
}

export function authorization(email, password) {
    return request('auth/login', {
        method: 'POST',
        headers: config.main,
        body: JSON.stringify({ 'email': email, 'password': password })
    })
}

export function logout() {
    return request('auth/logout', {
        method: 'POST',
        headers: config.main,
        body: JSON.stringify({ token: localStorage.getItem('refreshToken') })
    })
}

export function getUserData() {
    return requestWithRefresh('auth/user', {
        method: 'GET',
        headers: {
            authorization: localStorage.getItem('accessToken'),
            "Content-Type": "application/json",
        }
    });
}

export function updateUserData(email, userName) {
    return request('auth/user', {
        method: 'PATCH',
        headers: {
            authorization: localStorage.getItem('accessToken'),
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: userName,
            email: email,
        })
    });
}

function checkResponse(res) {    
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

function request(endPoint, settings) {
    return fetch(config.baseUrl+endPoint, settings).then(checkResponse)
}

export const refreshToken = () => { 
    return request(`auth/token`, 
        { 
            method: "POST",
            headers: config.main,
            body: JSON.stringify({ token: localStorage.getItem("refreshToken"),}),
     }); 
}

async function requestWithRefresh(endPoint, settings) { 
    
    try {
        return await request(endPoint, settings)
    }
    catch(error) {   
        console.log('Try to refresh token');          
        if(error.message === 'jwt expired') {            
            const newTokens = await refreshToken();
            
            if(!newTokens.success) return Promise.reject(newTokens);

            localStorage.setItem('accessToken', newTokens.accessToken);
            localStorage.setItem('refreshToken', newTokens.refreshToken);
            settings.headers.authorization = newTokens.accessToken;

            return await request(endPoint, settings)
        } else {
            return Promise.reject(error);
        }
    }
}