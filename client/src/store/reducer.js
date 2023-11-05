const initialState = {
    socket: null,
    messages: [],
    activeRoom: null,
    rooms: []
};

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_WEBSOCKET':
            return { ...state, socket: action.payload };
        case 'RECEIVE_MESSAGE':
            if (action.payload.type === 'initial') {
                return { ...state, rooms: action.payload.rooms };
            }
            if (action.payload.type === 'join') {
                return { ...state, messages: action.payload.messageHistory };
            }
            if (action.payload.type === 'chat') {
                return { ...state, messages: [...state.messages, action.payload] };
            }
            return state;
        default:
            return state;
    }
};

export default chatReducer;