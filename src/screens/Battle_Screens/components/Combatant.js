import React, { useCallback } from 'react';
import { useState, useEffect } from 'react';
import AttackButton from './AttackButton'
import GameButton from './GameButton';
import Close from './images/close.svg'


export default function Combatant({
    currentPlayer,
    specialAttack,
    selectDefender,
    attacker,
    defender,
    screenOwner,
    isAttacking,
    thisPlayer
}) {
    // console.warn(currentPlayer);

    const [dataVisible, setDataVisible] = useState(false)
    const [playerDead, setPlayerDead] = useState(false)

    useEffect(() => {
        if (currentPlayer.card.healthpoints <= 0) {
            setPlayerDead(true)
        }
    }, [currentPlayer, setPlayerDead])

    const openCombatantMenu = useCallback(() => {
        setDataVisible(dataVisible => !dataVisible)
    }, [setDataVisible])

    let originalCards = thisPlayer.cardList;
    let originalStats = originalCards.filter(orig => orig.id === currentPlayer.card.id)
    console.warn('originalStats', originalStats);

    return (
        <div className="combatant" style={{ color: attacker.card === currentPlayer.card ? 'red' : 'black' }} data-id={currentPlayer.card.id}>
            {playerDead === false ?
                <>
                    <div className='entity'
                        onClick={() => selectDefender(currentPlayer)}
                        disabled={playerDead === true || attacker.card === currentPlayer.card ? true : false}>
                        <div className='entity-view'>
                            <h3 className="character_stat card-title" >
                                {currentPlayer.card.creature}
                            </h3>
                            <div className="character_stat health" data={currentPlayer.card.healthpoints > 0 ? currentPlayer.card.healthpoints : 'dead'}>
                                Health: {currentPlayer.card.healthpoints >= 0 ? currentPlayer.card.healthpoints : 0}
                                <div className='health-bar'>
                                    <div className='health-bar-counter'
                                        style={{ width: (currentPlayer.card.healthpoints * 100) / originalStats[0].healthpoints + '%' }}></div>
                                </div>
                            </div>
                            <div className='currentPlayer-level'>Level: {currentPlayer.card.level}</div>
                        </div>
                    </div>
                    <div className={`c-menu ${screenOwner}`}>
                        <div className='view-combatant' style={{ display: currentPlayer === attacker ? 'block' : 'none' }}>
                            <GameButton className={'open-combatant-menu menu-button transparent'} action={openCombatantMenu}>Choose Attack</GameButton>
                        </div>
                        {dataVisible === true ?
                            <div className='combatant-menu'>
                                <GameButton
                                    className={'close-combatant-menu menu-button transparent'}
                                    action={openCombatantMenu}>
                                    <img src={Close} alt="close"></img>
                                </GameButton>
                                <div className="character_stat weaponskill">Weapon Skill: {currentPlayer.card.weaponskill}</div>
                                <div className="character_stat strength">Strength: {currentPlayer.card.strength}</div>
                                <div className="character_stat toughness">Toughness: {currentPlayer.card.toughness}</div>
                                <div className="character_stat manapoints">Mana points: {currentPlayer.card.manapoints}</div>
                                <div className="character_stat magicresistance">Magic Resistance: {currentPlayer.card.magicresistance}</div>
                                <div className="character_stat speed">Speed: {currentPlayer.card.speed}</div>
                                <div className='attacks'>
                                    {currentPlayer.card.level >= currentPlayer.card.attack_1[1]
                                        ?
                                        <div className='attack_one'>
                                            <AttackButton
                                                className='attack-button button'
                                                attack={currentPlayer.card.attack_1[0]}
                                                specialAttack={specialAttack}
                                                openCombatantMenu={openCombatantMenu}
                                            >
                                                {currentPlayer.card.attack_1[0]}
                                            </AttackButton>
                                        </div>
                                        :
                                        <></>}

                                    {currentPlayer.card.level >= currentPlayer.card.attack_2[1]
                                        ?
                                        <div className='attack_two' >
                                            <AttackButton
                                                className='attack-button button'
                                                attack={currentPlayer.card.attack_2[0]}
                                                specialAttack={specialAttack}
                                                openCombatantMenu={openCombatantMenu}
                                            >
                                                {currentPlayer.card.attack_2[0]}
                                            </AttackButton>
                                        </div>
                                        :
                                        <></>}

                                    {currentPlayer.card.level >= currentPlayer.card.attack_3[1]
                                        ?
                                        <div className='attack_three' >
                                            <AttackButton
                                                className='attack-button button'
                                                attack={currentPlayer.card.attack_3[0]}
                                                specialAttack={specialAttack}
                                                openCombatantMenu={openCombatantMenu}
                                            >
                                                {currentPlayer.card.attack_3[0]}
                                            </AttackButton>
                                        </div>
                                        :
                                        <></>}

                                    {currentPlayer.card.level >= currentPlayer.card.attack_4[1]
                                        ?
                                        <div className='attack_four' >
                                            <AttackButton
                                                className='attack-button button'
                                                attack={currentPlayer.card.attack_4[0]}
                                                specialAttack={specialAttack}
                                                openCombatantMenu={openCombatantMenu}
                                            >
                                                {currentPlayer.card.attack_4[0]}
                                            </AttackButton>
                                        </div>
                                        :
                                        <></>}
                                </div>
                            </div>

                            :
                            <></>
                        }
                    </div>
                </>
                :
                <div className='entity'
                    disabled={playerDead === true ? true : false}>
                    <div className='dead'>{currentPlayer.card.creature} is dead!</div>
                </div>
            }

        </div>
    );

}