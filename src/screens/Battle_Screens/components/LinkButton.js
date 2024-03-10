import React from 'react';
import './styles/buttons.css'

export default function LinkButton({ className, href, children }) {

    return (
        <button className={className} href={href}>
            {children}

        </button>
    );


}