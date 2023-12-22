import { REGISTER, SIGNIN, LOGOUT, GETUSER, UPDATE_USER } from "../actions/auth-actions";
import { TAuthActions } from "../actions/auth-actions";

type TAuthState = {
    success: boolean;
    user: {
        email: string,
        name: string,
    };
};

const initialState: TAuthState = {
  success: false,
  user: {
      email: '',
      name: '',
  }
}

export default function authReducer(state = initialState, action: TAuthActions): TAuthState {    
    
    switch (action.type) {
        case REGISTER:            
        case SIGNIN:            
            const data = action.payload;
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);

            return {
                    success: true,
                    user: {
                        email: data.user.email,
                        name: data.user.name,
                    }
                }
        case LOGOUT:
            localStorage.setItem('accessToken', '');
            localStorage.setItem('refreshToken', '');
            return state = initialState;
        case GETUSER:            
            return {...state, user: {email: action.payload.user.email, name: action.payload.user.name} }        
        case UPDATE_USER:
            return {...state, user: {email: action.payload.user.email, name: action.payload.user.name} }
        default:
            return state;
    }
}