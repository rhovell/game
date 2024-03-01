import React, { useCallback } from 'react';
import { useState, useEffect }  from 'react';
import AttackButton from './components/AttackButton'

export default function OpponentScreen({ 
    attacker, 
    defender, 
    screenOwner, 
    playerCard, 
    opponent, 
    specialAttack }) {
// console.warn(player);

    useEffect(() => {
        console.warn('playerCard',playerCard);
    }, [playerCard]);


    return (
        <div>
            <div className='player-details'>
                <h2 className="username">{screenOwner.username}</h2>
                <div className="player-level">Level: {screenOwner.level}</div>
                {screenOwner.experiencepoints ? <div className="player-exp">Exp: {screenOwner.experiencepoints}</div> : <></>}
                
            </div>
            <div className="card-area" style={{borderColor: attacker.creature === playerCard.creature ? 'red' : 'black'}}>
                <h3 className="card-data card-title">{playerCard.creature}</h3>
                <div className="card-data health" data={playerCard.healthpoints > 0 ? playerCard.healthpoints : 'dead'}>Health: {playerCard.healthpoints >= 0 ? playerCard.healthpoints : 0}</div>
                <div className="card-data weaponskill">Weapon Skill: {playerCard.weaponskill}</div>
                <div className="card-data strength">Strength: {playerCard.strength}</div>
                <div className="card-data toughness">Toughness: {playerCard.toughness}</div>
                <div className="card-data manapoints">Mana points: {playerCard.manapoints}</div>
                <div className="card-data magicresistance">Magic Resistance: {playerCard.magicresistance}</div>
                <div className="card-data speed">Speed: {playerCard.speed}</div>
                <div className='attacks'>
                    {playerCard.level <= playerCard.attack_1[1] 
                    ?
                    <div className='attack_one'>
                        <AttackButton className='attack-button button' attack={playerCard.attack_1[0]} specialAttack={specialAttack}>{playerCard.attack_1[0]}</AttackButton>
                    </div> 
                    :
                    <></>}

                    {playerCard.level <= playerCard.attack_2[1] 
                    ?
                    <div className='attack_two'>
                        <AttackButton className='attack-button button' attack={playerCard.attack_2[0]} specialAttack={specialAttack}>{playerCard.attack_2[0]}</AttackButton>
                    </div> 
                    :
                    <></>}

                    {playerCard.level <= playerCard.attack_3[1] 
                    ?
                    <div className='attack_three'>
                        <AttackButton className='attack-button button' attack={playerCard.attack_3[0]} specialAttack={specialAttack}>{playerCard.attack_3[0]}</AttackButton>
                    </div> 
                    :
                    <></>}

                    {playerCard.level <= playerCard.attack_4[1] 
                    ?
                    <div className='attack_four'>
                        <AttackButton className='attack-button button' attack={playerCard.attack_4[0]} specialAttack={specialAttack}>{playerCard.attack_4[0]}</AttackButton>
                    </div> 
                    :
                    <></>}
                </div>
            </div>
        </div>
    );


    }