import React from 'react';
import './message.scss';

export const Message = ({ nickname, message }) => {
    return (
        <div className="message_wrapper">
            <p className="message_name">
                {nickname}
            </p>
            <p className="message_text">
                {message}
            </p>
        </div>
    )
}
export default Message;