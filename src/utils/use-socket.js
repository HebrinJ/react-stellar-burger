export function webSocketConnect(url) {
    return new WebSocket(url);
}

export function webSocketClose(connection) {
    connection.close(1000, 'regular completion')
}