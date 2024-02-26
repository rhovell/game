import React from 'react';
import { useState, useEffect }  from 'react';

export default function PlayerScreen({player}) {
// console.warn(player);
    const [selectedCard, setSelectedCard] = useState('')

    useEffect(() => {
        setSelectedCard(player.cardList[0])
    }, []);
 
    return (
        <div>
            <div className="player-level">Level: {player.level}</div>
            <div className="username">{player.username}</div>
            <div className="points">Points: {player.points}</div>
            <div className="card-area">
                <div className="card-title">{selectedCard.creature}</div>
                <div className="health">Health: {selectedCard.healthpoints}</div>
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