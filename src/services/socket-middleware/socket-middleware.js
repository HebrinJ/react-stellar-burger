export default function middlewareCreator(wsActions) {

    return (store) => {
        let socket = null;
        const { wsConnect, wsSendMessage, onOpen, onClose, onError, onMessage, wsConnecting, wsDisconnect } = wsActions

        return (next) => (action) => {
            const { dispatch } = store;
            const { type } = action;

            if(type === wsConnect) {                
                socket = new WebSocket(action.payload);
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
                    const message = { type: onMessage, payload: restData}

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

            if(wsSendMessage && type === wsSendMessage && socket) {
                socket.send(JSON.stringify(action.payload));
            }

            if(type === wsDisconnect && socket) {
                socket.close()
                socket = null;
            }
            
            next(action);
        }
    }
}