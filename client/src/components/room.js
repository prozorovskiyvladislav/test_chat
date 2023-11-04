import React from "react";
import './room.scss';

export const Room = ({room, onClick}) => {
    return (
        <div className="room_wrapper" onClick={onClick}>
            <p className="room_text"> {room}</p>
        </div>
    )
}

export default Room;