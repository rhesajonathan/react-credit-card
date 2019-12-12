import React from 'react';
import './styles.css'
function Button({onClick,disabled = false}){
    console.log(disabled)
    return(
        <>
            <button className="button-component" onClick={onClick} disabled={!disabled}>Submit</button>
        </>
    )
}

export default Button;