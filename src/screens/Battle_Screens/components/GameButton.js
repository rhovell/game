import React from 'react';
import './styles/buttons.css'

export default function GameButton({ className, action, children }) {
    function handleClick(){
        action()
    }
 
    return (
        <button className={className} onClick={() => handleClick()}>
            {children}

        </button>
    );


    }