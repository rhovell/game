import React from 'react';
import { useState, useEffect }  from 'react';
import AttackButton from './components/AttackButton'

export default function PlayerScreen({ attacker, defender, playerInfo, playerCard, runTurn, playersTurn }) {
// console.warn(player);
    const [selectedCard, setSelectedCard] = useState('')
    const [player, setPlayer] = useState('')


    useEffect(() => {
        setSelectedCard(playerCard)
        setPlayer(playerInfo)
    }, [player, setPlayer, selectedCard, setSelectedCard, playerInfo, playerCard]);
 
    return (
        <div>
            <div className='player-details'>
                <h2 className="username">{player.username}</h2>
                <div className="player-level">Level: {player.level}</div>
                {player.experiencepoints ? <div className="player-exp">Exp: {player.experiencepoints}</div> : <></>}
                
            </div>
            <div className="card-area" style={{borderColor: attacker.creature === selectedCard.creature ? 'red' : 'black'}}>
                <h3 className="card-data card-title">{selectedCard.creature}</h3>
                <div className="card-data health" data={selectedCard.healthpoints > 0 ? selectedCard.healthpoints : 'dead'}>Health: {selectedCard.healthpoints >= 0 ? selectedCard.healthpoints : 0}</div>
                <div className="card-data weaponskill">Weapon Skill: {selectedCard.weaponskill}</div>
                <div className="card-data strength">Strength: {selectedCard.strength}</div>
                <div className="card-data toughness">Toughness: {selectedCard.toughness}</div>
                <div className="card-data manapoints">Mana points: {selectedCard.manapoints}</div>
                <div className="card-data magicresistance">Magic Resistance: {selectedCard.magicresistance}</div>
                <div className="card-data speed">Speed: {selectedCard.speed}</div>
            </div>
            <div className='attacks'>
                {/* {selectedCard.attacks.map((attack, i) =>
                <AttackButton key={player.username+'_attack_'+i+'_'+attack} attack={attack} onClick={runTurn}>{attack}</AttackButton>
                )} */}
            </div>
        </div>
    );


    }