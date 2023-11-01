import { REGISTER, SIGNIN, LOGOUT, GETUSER, UPDATE_USER } from "../actions/auth-actions";

const initialState = {
  success: false,
  user: {
      email: '',
      name: '',
  }
}

export default function authReducer(state = initialState, action) {    

    switch (action.type) {
        case REGISTER:
            return state;
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