import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Input, Message} from "../components";
import "./chat-room.scss";
import { sendMessage } from "../store/actions";

const ChatRoom = ({ messages, sendMessage, socket }) => {
    const navigate = useNavigate();
    const { roomId } = useParams();
    const [nickname, setNickname] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if(!socket) {
            navigate('/')
        }
    }, []);
    console.log(messages)

    const handleSendMessage = (e) => {
        e.preventDefault();

        if (nickname.trim() === '') {
            setError('Nickname is required');
            return;
        }

        if (message.trim() === '') {
            setError('Message is required');
            return;
        }

        if (message.length > 250) {
            setError('Message should be 250 characters or less');
            return;
        }

        setError('');

        if (!message) {
            return;
        }

        const messageData = {
            type: 'chat',
            nickname,
            message,
        };
        sendMessage(messageData);
        setMessage('');
    };

    return (
        <div className="chat-room_wrapper">
            <main className="chat-room_window">
                <h1 className="chat-room_window__title">Chat Room: {roomId}</h1>
                {messages.length ? messages.map((msg, index) => (
                    <Message message={msg.message} nickname={msg.nickname} key={index}/>
                )): (<p className="chat-room_window__description">No message yet</p>)}
            </main>
            <form className="chat-room_form">
                <Input name="nickname" placeholder="Nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />
                <Input name="message" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)}/>
                <Button title="Send" onClick={handleSendMessage} />
                {error && <div className="chat-room_error">{error}</div>}
            </form>
        </div>
    )
}

const mapStateToProps = (state) => ({
    activeRoom: state.activeRoom,
    messages: state.messages,
    socket: state.socket
});

export default connect(mapStateToProps, {
    sendMessage,
})(ChatRoom);