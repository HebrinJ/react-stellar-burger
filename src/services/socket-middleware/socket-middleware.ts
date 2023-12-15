import { RootState } from "../..";
import { TWebSocketActions } from "../../utils/typesDescription";
import { AppDispatch } from "../..";
import { Middleware } from "redux";

export default function middlewareCreator(wsActions: TWebSocketActions): Middleware<{}, RootState> {
    
    return (store) => {
        let socket: WebSocket | null = null;
        const { wsConnect, /*wsSendMessage,*/ onOpen, onClose, onError, onMessage, wsConnecting, wsDisconnect } = wsActions

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

            // if(wsSendMessage && type === wsSendMessage && socket) {
            //     socket.send(JSON.stringify(action.payload));
            // }

            if(type === wsDisconnect && socket) {
                socket.close()
                socket = null;
            }
            
            next(action);
        }
    }
}