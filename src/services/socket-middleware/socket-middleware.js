export default function middlewareCreator(wsActions) {

    return (store) => {
        let socket = null;

        return (next) => (action) => {
            const { dispatch } = store;
            const { type } = action;
            const { wsConnect, wsSendMessage, onOpen, onClose, onError, onMessage, wsConnecting, wsDisconnect } = wsActions
            
            if(type === wsConnect) {                
                socket = new WebSocket(action.payload);
                dispatch({ type: wsConnecting})
            }

            if(socket) {
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

                    if(success) {
                        dispatch({ type: onMessage, payload: restData});
                    } else {
                        dispatch({ type: onError, payload: 'Can\'t resolve data'});
                    }
                }

                socket.onclose = (event) => {
                    dispatch({ type: onClose });
                }

                if(wsSendMessage && type === wsSendMessage) {
                    socket.send(JSON.stringify(action.payload));
                }

                if(type === wsDisconnect) {
                    socket.close()
                    socket = null;
                }
            }
        }
    }
}