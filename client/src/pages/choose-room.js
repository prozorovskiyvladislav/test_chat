// ChooseRoom.js
import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {connect} from "react-redux";
import {Room} from "../components";
import './choose-room.scss'
import {initializeSocket, sendMessage} from "../store/actions";

export const ChooseRoom = ({rooms, initializeSocket, sendMessage, socket}) => {
    const navigate = useNavigate();

    useEffect(() => {
        if(!socket) {
            const newSocket = new WebSocket('ws://localhost:8080');
            initializeSocket(newSocket)
        }
    }, []);
    const handleJoinRoom = (room) => {
        const messageData = {
            type: 'join',
            activeRoom: room
        };
        sendMessage(messageData);
        navigate(`/room/${room}`);
    };

    return (
        <div className="choose-room_wrapper">
            <div className="choose-room_window">
                <h1 className="choose-room_window__title">Choose your room: </h1>
                {rooms.map((room, index) => <Room room={room} key={index} onClick={() => handleJoinRoom(room)}/>)}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    rooms: state.rooms,
    messages: state.messages,
    socket: state.socket
});

export default connect(mapStateToProps, {
    initializeSocket,
    sendMessage
})(ChooseRoom);