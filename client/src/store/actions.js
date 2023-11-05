export const setWebSocket = (socket) => ({
    type: 'SET_WEBSOCKET',
    payload: socket,
});

export const receiveMessage = (messageData) => ({
    type: 'RECEIVE_MESSAGE',
    payload: messageData,
});

export const sendMessage = (messageData) => ({
    type: 'SEND_MESSAGE',
    payload: messageData,
});

export const initializeSocket = (socket) => ({
    type: 'INITIALIZE_SOCKET',
    payload: socket
});