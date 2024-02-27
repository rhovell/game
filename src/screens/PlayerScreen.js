import React from 'react';
import { useState, useEffect }  from 'react';

export default function PlayerScreen({player}) {
// console.warn(player);
    const [selectedCard, setSelectedCard] = useState('')

    useEffect(() => {
        setSelectedCard(player.cardList[0])
    }, [player.cardList]);
 
    return (
        <div>
            <h2 className="username">{player.username}</h2>
            <div className="player-level">Level: {player.level}</div>
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