import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { rootReducer } from "./services/reducers/root-reducer";
import { BrowserRouter } from "react-router-dom";
import { updateSessionStore, getSessionStore } from "./utils/session-store";
import { configureStore } from "@reduxjs/toolkit";
import middlewareCreator from "./services/socket-middleware/socket-middleware";
import { WS_CLOSE, WS_CONNECT, WS_CONNECTING, WS_DISCONNECT, WS_ERROR, WS_MESSAGE, WS_OPEN } from "./services/actions/all-orders-actions";

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const socketMiddleware = middlewareCreator({
  wsConnect: WS_CONNECT,
  onOpen: WS_OPEN,
  onClose: WS_CLOSE,
  onError: WS_ERROR,
  onMessage: WS_MESSAGE,
  wsConnecting: WS_CONNECTING,
  wsDisconnect: WS_DISCONNECT,
})

//const store = createStore(rootReducer, getSessionStore(), composeEnhancers(applyMiddleware(thunk)));
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(socketMiddleware).concat(thunk)
  },
  preloadedState: getSessionStore(),
})

store.subscribe(() => {
  updateSessionStore(store.getState());
})

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
