import React from 'react'
import './styles.css'

function TextInput({type,size,name,placeholder,onChange,onFocus,value}){
    const styleNumber = type === 'number'?{width:(size*12.1)+'px'}:{}
    return(
        <>
            <input type={type} className="text-input" size={size}name={name} placeholder={placeholder} style={styleNumber} value={value} onChange={onChange} onFocus={onFocus} ></input>
        </>
    )
}

export default TextInput;