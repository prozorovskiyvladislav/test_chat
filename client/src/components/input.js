import React from "react";
import "./input.scss";


export const Input = ({ placeholder, name, value, onChange }) => {
    return <input placeholder={placeholder} name={name} className="input" value={value} onChange={onChange} />
}

export default Input;