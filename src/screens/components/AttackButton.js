import React from 'react';
import { useState, useEffect }  from 'react';

export default function AttackButton({ className, attack, specialAttack }) {
// console.warn(player);
    function handleClick(attack){
        specialAttack(attack)
    }
 
    return (
        <button attack={attack} className={className} onClick={() => handleClick(attack)}>
            {attack}

        </button>
    );


    }