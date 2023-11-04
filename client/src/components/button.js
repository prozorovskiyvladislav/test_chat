import React from "react";
import "./button.scss";

export const Button = ({ title, onClick }) => {
    return <button className="button" onClick={onClick}> {title} </button>
}

export default Button;