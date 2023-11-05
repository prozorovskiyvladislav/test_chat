const http = require('http');
const WebSocket = require('ws');
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Chat Server\n');
});

const wss = new WebSocket.Server({ server });

const clients = new Set();
const rooms = ['General Chat', 'Social Hangout', 'Discussion Zone', 'Chatter\'s Corner', 'Chat Café' ];

const messageHistory = [];
const LAST_MESSAGES_NUMBER = -10;
const MESSAGE_DATA_TYPES = {
    JOIN: 'join',
    INITIAL: 'initial',
    CHAT: 'chat',
    LEAVE: 'leave'
}
function broadcast(data) {
    const message = JSON.stringify(data);

    for (const client of clients) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    }
}

wss.on('connection', (ws) => {
    let nickname;
    let activeRoom;

    ws.on('message', (message) => {
        const messageData = JSON.parse(message);

        switch (messageData.type) {
            case MESSAGE_DATA_TYPES.JOIN:
                activeRoom = messageData.activeRoom;
                const messageHistoryLast = messageHistory[activeRoom] ? messageHistory[activeRoom].slice(LAST_MESSAGES_NUMBER) : [];
                broadcast({ type: MESSAGE_DATA_TYPES.JOIN, messageHistory: messageHistoryLast });
                break;
            case MESSAGE_DATA_TYPES.INITIAL:
                broadcast({ type: MESSAGE_DATA_TYPES.INITIAL, rooms });
                break;
            case MESSAGE_DATA_TYPES.CHAT:
                nickname = messageData.nickname;
                const chatMessage = {
                    type: MESSAGE_DATA_TYPES.CHAT,
                    nickname,
                    message: messageData.message,
                    timestamp: new Date(),
                };
                broadcast(chatMessage);
                if (!messageHistory[activeRoom]) {
                    messageHistory[activeRoom] = [];
                }
                messageHistory[activeRoom].push(chatMessage);
                break;
            default:
                break;
        }
    });

    ws.on('close', () => {
        if (nickname) {
            broadcast({ type: MESSAGE_DATA_TYPES.LEAVE, nickname });
        }
    });

    clients.add(ws);
});

server.listen(8080, () => {
    console.log('Server is running on port 8080');
});