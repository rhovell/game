import React from 'react';
import { useState, useEffect } from 'react';

export default function Card({ selectedCreature }) {
    // console.warn(player);
    const [creature, setCreature] = useState('')

    useEffect(() => {
        setCreature(selectedCreature)
    }, [selectedCreature, setCreature]);

    return (
        <div>
            <div className="card" >
                <h3 className="card-title">{creature.creature}</h3>
                <div className="health" data={creature.healthpoints > 0 ? creature.healthpoints : 'dead'}>Health: {creature.healthpoints > 0 ? creature.healthpoints : 0}</div>
                <div className="weaponskill">Weapon Skill: {creature.weaponskill}</div>
                <div className="strength">Strength: {creature.strength}</div>
                <div className="toughness">Toughness: {creature.toughness}</div>
                <div className="manapoints">Mana points: {creature.manapoints}</div>
                <div className="magicresistance">Magic Resistance: {creature.magicresistance}</div>
                <div className="speed">Speed: {creature.speed}</div>
            </div>
        </div>
    );


}