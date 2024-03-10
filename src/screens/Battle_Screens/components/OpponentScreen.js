import React, { useCallback } from 'react';
import { useState, useEffect }  from 'react';
import Combatant from './components/Combatant'


export default function OpponentScreen({ 
    attacker, 
    defender, 
    screenOwner, 
    opponent, 
    specialAttack,
    opponentTeam,
    setCurrentDefender }) {

    return (
        <div>
            <div className='player-details'>
                <h2 className="username">{screenOwner.username}</h2>
                <div className="player-level">Level: {screenOwner.level}</div>
                {screenOwner.experiencepoints ? <div className="player-exp">Exp: {screenOwner.experiencepoints}</div> : <></>}
            </div>
            <div className='card-area'>
                {opponentTeam.map((player, i) => 
                    <Combatant
                    key={`computer_${player.card.creature}_${i}`}
                    player={player} 
                    specialAttack={specialAttack}
                    attacker={attacker}
                    setCurrentDefender={setCurrentDefender}
                    ></Combatant>
                )}
            </div>
        </div>
    );


    }