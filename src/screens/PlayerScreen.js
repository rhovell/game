import React from 'react';
import { useState, useEffect }  from 'react';

export default function PlayerScreen({ playerInfo, playerCard }) {
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
            <div className="card-area" >
                <h3 className="card-title">{selectedCard.creature}</h3>
                <div className="health" data={selectedCard.healthpoints > 0 ? selectedCard.healthpoints : 'dead'}>Health: {selectedCard.healthpoints > 0 ? selectedCard.healthpoints : 0}</div>
                <div className="weaponskill">Weapon Skill: {selectedCard.weaponskill}</div>
                <div className="strength">Strength: {selectedCard.strength}</div>
                <div className="toughness">Toughness: {selectedCard.toughness}</div>
                <div className="manapoints">Mana points: {selectedCard.manapoints}</div>
                <div className="magicresistance">Magic Resistance: {selectedCard.magicresistance}</div>
                <div className="speed">Speed: {selectedCard.speed}</div>
            </div>
        </div>
    );


    }