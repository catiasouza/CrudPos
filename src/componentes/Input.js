import React from "react";

function Input({props, name, onChange, value}) {
    return (
        <div>
          <label>{props}<input type="text" name={name} onChange={onChange} value={value}></input></label>
        </div>
    )
}

export default Input;