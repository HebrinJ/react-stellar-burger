import { REGISTER, SIGNIN, LOGOUT } from "../actions/auth-actions";

const initialState = {
  success: false,
  user: {
      email: '',
      name: '',
  },
  accessToken: '',
  refreshToken: ''
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
                    },
                    accessToken: data.accessToken,
                    refreshToken: data.refreshToken
                }
        case LOGOUT:
            localStorage.setItem('accessToken', '');
            localStorage.setItem('refreshToken', '');
            return state = initialState;
        default:
            return state;
    }
}