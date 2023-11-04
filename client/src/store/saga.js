import { eventChannel } from 'redux-saga';
import { call, put, take, takeEvery, select, all } from 'redux-saga/effects';
import {setWebSocket, receiveMessage, sendMessage} from './actions';

function createWebSocketChannel(socket) {
    return eventChannel((emit) => {
        const onMessage = (event) => {
            const messageData = JSON.parse(event.data);
            emit(receiveMessage(messageData));
        };

        const onOpen = () => {
            emit(setWebSocket(socket));
            emit(sendMessage({type: 'initial'}))
        };

        const onClose = () => {
            // Handle WebSocket close event, e.g., reconnection logic
        };

        socket.addEventListener('message', onMessage);
        socket.addEventListener('open', onOpen);
        socket.addEventListener('close', onClose);

        return () => {
            // Cleanup code here if necessary
            socket.removeEventListener('message', onMessage);
            socket.removeEventListener('open', onOpen);
            socket.removeEventListener('close', onClose);
        };
    });
}

function* handleWebSocket() {
    yield takeEvery('SEND_MESSAGE', function* (action) {
        const socket = yield select((state) => state.socket);
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(action.payload));
        }
    });
}

function* handleIncomingMessages(channel) {
    while (true) {
        const action = yield take(channel);
        yield put(action);
    }
}

function* rootSaga() {
    yield takeEvery('INITIALIZE_SOCKET', function* (action) {
        const socket = action.payload;
        const channel = yield call(createWebSocketChannel, socket);
        yield put(setWebSocket(socket));
        yield call(handleIncomingMessages, channel);

    })
    yield all([
        handleWebSocket()
        ])
}

export default rootSaga;