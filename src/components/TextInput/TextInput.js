import React from 'react'
import './styles.css'

function TextInput({type,size,name,placeholder,onChange,onFocus,value,isValid = false,invalidReason =""}){
    const styleNumber = type === 'number'?{width:(size*12.1)+'px'}:{}
    return(
        <div className="input-container">
            <input type={type} className={`text-input ${isValid? "":'text-input-invalid'}`} size={size}name={name} placeholder={placeholder} style={styleNumber} value={value} onChange={onChange} onFocus={onFocus} ></input>
            <div className="invalid-text">{invalidReason}</div>
        </div>
    )
}

export default TextInput;