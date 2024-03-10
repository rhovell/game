import React from 'react';

export default function AttackButton({ className, attack, specialAttack, openCombatantMenu }) {
// console.warn(player);
    function handleClick(attack){
        specialAttack(attack)
        openCombatantMenu()
    }
 
    return (
        <button attack={attack} className={className} onClick={() => handleClick(attack)}>
            {attack}

        </button>
    );


    }