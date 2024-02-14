import { RootState } from "../..";
import { TWebSocketActions } from "../../utils/types-description";
import { Middleware } from "redux";

export default function middlewareCreator(wsActions: TWebSocketActions): Middleware<{}, RootState> {
    
    return (store) => {
        let socket: WebSocket | null = null;
        const { wsConnect, onOpen, onClose, onError, onMessage, wsConnecting, wsDisconnect } = wsActions

        return (next) => (action) => {
            const { dispatch } = store;
            const { type } = action;

            if(type === wsConnect) {

                socket = new WebSocket(action.url);
                dispatch({ type: wsConnecting})

                socket.onopen = (event) => {
                    dispatch({ type: onOpen })
                }

                socket.onerror = (event) => {
                    dispatch({ type: onError, payload: 'Web socket error'})
                }

                socket.onmessage = (event) => {
                    const data = event.data;
                    const parsedData = JSON.parse(data);
                    const { success, ...restData} = parsedData;
                    const message = { type: onMessage, payload: restData }

                    if(success) {
                        dispatch(message);
                    } else {
                        dispatch({ type: onError, payload: 'Can\'t resolve data'});
                    }
                }

                socket.onclose = (event) => {
                    dispatch({ type: onClose });
                }
            }

            if(type === wsDisconnect && socket) {
                socket.close()
                socket = null;
            }
            
            next(action);
        }
    }
}