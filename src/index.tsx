import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import { Provider } from 'react-redux';
import { rootReducer } from "./services/reducers/root-reducer";
import { BrowserRouter } from "react-router-dom";
import { updateSessionStore, getSessionStore } from "./utils/session-store";
import { configureStore } from "@reduxjs/toolkit";
import middlewareCreator from "./services/socket-middleware/socket-middleware";
import { TWebSocketOrdersActions, WS_CLOSE, WS_CONNECT, WS_CONNECTING, WS_DISCONNECT, WS_ERROR, WS_MESSAGE, WS_OPEN } from "./services/actions/all-orders-actions";
import { WS_USER_CONNECT, WS_USER_OPEN, WS_USER_CLOSE, WS_USER_ERROR, WS_USER_MESSAGE, WS_USER_CONNECTING, WS_USER_DISCONNECT, TWebSocketUserActions } from "./services/actions/user-orders-actions";
import { ThunkAction } from 'redux-thunk';
import { ActionCreator, Dispatch } from 'redux';
import { TAuthActions } from "./services/actions/auth-actions";

const feedMiddleware = middlewareCreator({
  wsConnect: WS_CONNECT,
  onOpen: WS_OPEN,
  onClose: WS_CLOSE,
  onError: WS_ERROR,
  onMessage: WS_MESSAGE,
  wsConnecting: WS_CONNECTING,
  wsDisconnect: WS_DISCONNECT,
})

const userFeedMiddleware = middlewareCreator({
  wsConnect: WS_USER_CONNECT,
  onOpen: WS_USER_OPEN,
  onClose: WS_USER_CLOSE,
  onError: WS_USER_ERROR,
  onMessage: WS_USER_MESSAGE,
  wsConnecting: WS_USER_CONNECTING,
  wsDisconnect: WS_USER_DISCONNECT
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(feedMiddleware).concat(userFeedMiddleware)
  },
  preloadedState: getSessionStore(),
});

store.subscribe(() => {
  updateSessionStore(store.getState());
});

export type RootState = ReturnType<typeof rootReducer>;

export type TApplicationActions = TWebSocketOrdersActions | TWebSocketUserActions | TAuthActions;

export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, RootState, unknown, TApplicationActions>>;

export type AppDispatch = Dispatch<TApplicationActions>; 

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
