import { TGetOrder, TIngredient, TMakeOrderResponse } from "./types-description";

type TTokenRefresh = {
    success: boolean;
    accessToken: string;
    refreshToken: string;
};

type TReturnedIngredients = {
    success: boolean,
    data: ReadonlyArray<TIngredient>;
};

type TForgotPas = {
    success: boolean;
};

type TPasswordReset = {
    success: boolean;
    message: string;
};

export type TRegister = {    
    success: boolean;
    user: {
        email: string,
        name: string,
    };
    accessToken: string;
    refreshToken: string;      
};

export type TAuthorization = {
    success: boolean;
    accessToken: string;
    refreshToken: string;
    user: {
      email: string,
      name: string,
    };
};

export type TLogout = {
    success: boolean;
    message: string;
};

export type TUserData = {    
    success: boolean;
    user: {
        email: string,
        name: string,
    }      
};

const config = {
    baseUrl: `https://norma.nomoreparties.space/api/`,
    main: {
        //authorization: "020effc4-1211-4deb-93d9-11a33dcdf1a5",
        "Content-Type": "application/json",        
    },
    authorized: {        
        authorization: localStorage.getItem('accessToken'),
        "Content-Type": "application/json",    
    } as Record<string, string>,
};

export function getData(): Promise<TReturnedIngredients> {
    return request('ingredients');
}

export function makeOrder(ingredients: ReadonlyArray<string>): Promise<TMakeOrderResponse | undefined> {
    const headers = new Headers(config.main);
    headers.set('authorization', localStorage.getItem('accessToken')!);

    return requestWithRefresh('orders', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ 'ingredients': ingredients })
    });
}

export function forgotPass(email: string): Promise<TForgotPas> {
    return request('password-reset', {
        method: 'POST',
        headers: config.main,
        body: JSON.stringify({ 'email': email })
    });
}

export function passwordReset(password: string, code: string): Promise<TPasswordReset> {
    return request('password-reset/reset', {
        method: 'POST',
        headers: config.main,
        body: JSON.stringify({ 'password': password, 'token': code })
    })
}

export function registration(email: string, password: string, name: string): Promise<TRegister> {
    return request('auth/register', {
        method: 'POST',
        headers: config.main,
        body: JSON.stringify({ 'email': email, 'password': password, 'name': name })
    })
}

export function authorization(email: string, password: string): Promise<TAuthorization> {
    return request('auth/login', {
        method: 'POST',
        headers: config.main,
        body: JSON.stringify({ 'email': email, 'password': password })
    })
}

export function logout(): Promise<TLogout> {
    return request('auth/logout', {
        method: 'POST',
        headers: config.main,
        body: JSON.stringify({ token: localStorage.getItem('refreshToken') })
    })
}

export function getUserData(): Promise<TUserData | undefined> {
    const headers = new Headers(config.main);
    headers.set('authorization', localStorage.getItem('accessToken')!);

    return requestWithRefresh('auth/user', {
        method: 'GET',
        headers: headers,
    });
}

export function updateUserData(email: string, userName: string, password: string): Promise<TUserData | undefined> {
    const headers = new Headers(config.main);
    headers.set('authorization', localStorage.getItem('accessToken')!);

    return requestWithRefresh('auth/user', {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify({
            name: userName,
            email: email,
            password: password,
        })
    });
}

export function getOrder(order: string): Promise<TGetOrder> {
    return request(`orders/${order}`);
}

function checkResponse<T>(res: Response): Promise<T> {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

function request<T>(endPoint: string, settings?: RequestInit): Promise<T> {
    return fetch(config.baseUrl+endPoint, settings).then(checkResponse<T>)
}

export const refreshToken = (): Promise<TTokenRefresh> => { 
    
    return request(`auth/token`, 
        { 
            method: "POST",
            headers: config.main,
            body: JSON.stringify({ token: localStorage.getItem("refreshToken")}),
     }); 
}

async function requestWithRefresh<T>(endPoint: string, settings: RequestInit): Promise<T | undefined> { 
    
    try {
        return await request(endPoint, settings);
    }
    catch(error: any) {
        if(Object.hasOwn(error, 'message')) { 
            if(error.message === 'jwt expired') {            
                const newTokens = await refreshToken();
                
                if(!newTokens.success) return Promise.reject(newTokens);
                
                localStorage.setItem('accessToken', newTokens.accessToken);
                localStorage.setItem('refreshToken', newTokens.refreshToken);
                
                const newSettings = {    
                    ...settings,
                    headers: {
                        authorization: newTokens.accessToken,
                        "Content-Type": "application/json",
                    },
                }
                
                return await request(endPoint, newSettings)
            } else {
                return Promise.reject(error);
            }
        }
    }
}