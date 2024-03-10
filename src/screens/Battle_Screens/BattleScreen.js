import './components/styles/MainScreen.scss';
import React, { useCallback, useState, useEffect } from 'react';
import Combatant from './components/Combatant.js'
import * as battle_action from './components/battle_actions.js'

export default function BattleScreen({
    playerTeam,
    opponentTeam,
    message,
    player,
    opponent,
    setMessage,
    attacks,
    allPlayers,
    setIsLoading
}) {

    const [attacker, setAttacker] = useState('');
    const [defender, setDefender] = useState('');
    const [turnOrder, setTurnOrder] = useState(allPlayers);
    const [turn, setTurn] = useState(1);
    const [round, setRound] = useState(1);
    const [automated, setAutomated] = useState(false);
    const [winner, setWinner] = useState('');
    const [isAttacking, setIsAttacking] = useState(false);
    const [runningAttack, setRunningAttack] = useState('')

    const element = React.useRef(null);

    useEffect(() => {
        console.warn('turnOrder', turnOrder);
        let turnList = battle_action.sortPlayers(turnOrder)
        console.warn('turnList', turnList);
        setTurnOrder(turnList)
        setAttacker(turnList[0])
        turnList[0].card.turnsTaken = 1;
        if (turnList)
            setMessage(`${turnList[0].card.creature} attacks first`)
        setIsLoading(false)
    }, [turnOrder])

    function tryAgain() {
        console.warn(attacker.card.creature, 'tries again');
        if (attacker.card.healthpoints > 0 && defender.card.healthpoints > 0) {
            if (attacker.card.healthpoints > 0 && defender.card.healthpoints > 0) {
                battle_action.hitOrMiss(2)
            }
        } else if (attacker.card.healthpoints <= 0 || defender.card.healthpoints <= 0) {
            battle_action.handleDeath()
        }
    }

    function switchPlayer() {
        setIsAttacking(false)
        console.warn('*********** switchPlayer ******************');
        console.warn(`*********** end turn ${turn} ******************`);
        console.warn('last turnOrder', turnOrder);
        console.warn('last attacker', attacker);
        // let remainingPlayers = turnOrder.length
        // let lastTurnOrder = remainingPlayers > 0 ? turnOrder : [];
        setTurn(turn => turn + 1)
        battle_action.handleDeath(turnOrder)
        battle_action.sortPlayers(turnOrder)
        setAttacker(turnOrder[0])
        turnOrder[0].turnsTaken = turnOrder[0].card.turnsTaken ? turnOrder[0].card.turnsTaken++ : 1;


        // if (turn % allPlayers.length === 0) {
        //     console.warn('round over');
        //     setMessage(`Round ${round} over`)
        //     setRound(round => round + 1)
        //     setTurnOrder(allPlayers)

        // } else {
        //     // let newTurnOrder = remainingPlayers > 0 ? lastTurnOrder.filter(a => a.card.id !== attacker.card.id) : allPlayers;
        //     console.warn('newTurnOrder', newTurnOrder);
        //     setTurnOrder(newTurnOrder)
        //     setAttacker(newTurnOrder[0])
        //     setMessage(`${newTurnOrder[0].card.creature} goes next`)
        // }
        console.warn('end round', round, 'turn', turn);

    }

    function handleSecondAttempt() {
        let random = Math.random();
        if (random < 50) {
            runTurn(2)
        } else {
            switchPlayer()
        }
    }

    function removeExistingModifiers() {
        console.warn('removeExistingModifiers');
        // if (runningAttack.combatant === true) {
        // let modifiers = runningAttack.modifiers[0]
        // let modifierDuration = runningAttack.duration;
        // for (var item in modifiers) {
        //     let val = modifiers[item]
        //     console.warn('item, modifierNumber', item, val);
        //     // if (item !== 'creature' && item !== 'id' && item !== 'totaldamage') {
        //     //     let result = battle_action.applyModifier(item, val, defender)
        //     //     defender.card[item] = result;
        //     // }
        // }
        // }
    }

    function runTurn(attackNumber = 1) {

        // first attempt
        if (attackNumber === 1) {
            // the first attack HIT
            if (battle_action.hitOrMiss(attackNumber, attacker, defender) === true) {
                // the defender parried successfully
                if (battle_action.parryOrConnect(attackNumber, attacker, defender) === true) {
                    // player gets second attempt
                    handleSecondAttempt()
                } else {
                    // the defender failed to parry 
                    defender.card.healthpoints = battle_action.calculateDamage(attackNumber, attacker, defender)

                }

            } else {
                // the first attempt missed 
                handleSecondAttempt()
            }


        } else if (attackNumber === 2) {

            if (battle_action.hitOrMiss(attackNumber, attacker, defender) === true) {
                // the second attack HIT

                if (battle_action.parryOrConnect(attackNumber, attacker, defender) === true) {
                    // the defender parried successfully
                    switchPlayer()
                    removeExistingModifiers()
                } else {
                    // the defender failed to parry 
                    defender.card.healthpoints = battle_action.calculateDamage(attackNumber, attacker, defender)
                    removeExistingModifiers()
                }
            } else {
                // the second attack missed 
                switchPlayer()
                removeExistingModifiers()
            }
        }
    }

    function specialAttack(chosenAttack) {
        setIsAttacking(true)
        console.warn('attack', chosenAttack);
        let currentAttack = attacks[chosenAttack]
        console.warn(currentAttack);

        if (currentAttack.damage === true) {
            let modifiers = currentAttack.modifiers[0]
            for (var item in modifiers) {
                let val = modifiers[item]
                console.warn('item, modifierNumber', item, val);
                if (item !== 'creature' && item !== 'id' && item !== 'totaldamage' && item !== 'turnsTaken') {
                    let result = battle_action.applyModifier(item, val, attacker)
                    attacker.card[item] = result;
                }
            }
        }

        if (runningAttack !== '' && defender !== '') {
            let playerId = defender.card.id
            setRunningAttack([
                ...runningAttack,
                { playerId: currentAttack }
            ])
        }
        if (defender !== '') {
            runTurn()
        } else {
            setMessage('Choose someone to attack!')

        }

    }

    // const setAuto = useCallback(() => {
    //     // console.warn('setauto');
    //     element.current.click()
    //     setAutomated(true)
    // }, [setAutomated])

    // useEffect(() => {
    //     if(automated === true){
    //         if(winner === ""){
    //             const interval = setInterval(() => {
    //                 element.current.click()
    //               }, 2500);
    //               return () => clearInterval(interval);
    //         }
    //     }
    // }, [automated, setAutomated])

    const endGame = useCallback((defender) => {
        console.warn('someone died!');
        let winnerName;
        let opponentsDeceased = turnOrder.filter((member) => member.card.healthpoints <= 0)
        // let playersDeceased = playerTeam.filter((member) => member.card.id === defender.card.id)
        // console.warn('playersDeceased', playersDeceased.length, 'out of', playerTeam.length);
        console.warn('opponentsDeceased', opponentsDeceased);


        if (opponentsDeceased.length > 0) {
            console.warn(`${opponentsDeceased[0].card.creature} died!`);
            // setWinner(`${opponentsDeceased} died!`)
            setMessage(`${opponentsDeceased[0].card.creature} died!`)
            // setTurnOrder()
        }
        // else if(playersDeceased.length === playerTeam.length){
        //     console.warn('all players died!');
        //     setWinner('You lost!')
        //     setMessage('You lost!')
        // } else {
        //     console.warn('playerTeam',playerTeam);
        //     console.warn('opponentTeam',opponentTeam);

        //     let newOrder = turnOrder.filter(item => item.card.id === defender.card.id)
        //     console.warn('new turnOrder', newOrder);

        //     setTurnOrder(newOrder)
        //     setMessage(`${opponentsDeceased.creature} died!`)
        //     switchPlayer()
        //   }
        //   setAutomated(false)
        //   return winnerName

    }, [setWinner, setAutomated, playerTeam, opponentTeam, setMessage, switchPlayer, turnOrder])


    function selectDefender(currentDefender) {
        console.warn('currentDefender', currentDefender);
        setDefender(currentDefender)
        // console.warn(attacker.card.creature, 'is attacking', currentDefender.card.creature);
        setMessage(`${attacker.card.creature} is attacking ${currentDefender.card.creature}`)
        if (runningAttack !== '') {
            let playerID = currentDefender.card.id
            setRunningAttack([
                { playerID: runningAttack }
            ])
            runTurn()
        } else {
            setMessage('Choose an attack!')
        }
        return currentDefender;
    }



    return (
        <>
            <main className="main">
                <h2 className='round'>Round {round}</h2>
                <div className="main-game-area">
                    <div className='player-half half-screen'>
                        {turnOrder.map((currentPlayer, i) => {
                            if (currentPlayer.card.id.includes('play')) {
                                return <Combatant
                                    key={`play_${currentPlayer.card.creature}_${i}`}
                                    currentPlayer={currentPlayer}
                                    specialAttack={specialAttack}
                                    attacker={attacker}
                                    defender={defender}
                                    selectDefender={selectDefender}
                                    screenOwner={'player'}
                                    isAttacking={isAttacking}
                                    thisPlayer={player}
                                ></Combatant>
                            } else {
                                return '';
                            }
                        })}
                    </div>
                    <div className='opponent-half half-screen'>
                        {turnOrder.map((currentPlayer, i) => {
                            if (currentPlayer.card.id.includes('opp')) {
                                return <Combatant
                                    key={`opp_${currentPlayer.card.creature}_${i}`}
                                    currentPlayer={currentPlayer}
                                    specialAttack={specialAttack}
                                    attacker={attacker}
                                    defender={defender}
                                    selectDefender={selectDefender}
                                    screenOwner='opponent'
                                    isAttacking={isAttacking}
                                    thisPlayer={opponent}
                                ></Combatant>
                            } else {
                                return '';
                            }
                        })}
                    </div>
                </div>
                <h3 className='winner' winner={winner !== '' ? "true" : "false"}>{winner ? winner + ' Wins!' : ''}</h3>
                {message ?
                    <div className='battle-messages'>
                        <div className='message'>{message}</div>
                    </div>
                    : <></>}

            </main>
            {/* <nav>
                <div className='automate-button'>
                    <button id="automate" onClick={setAuto}>Run Whole Match</button>
                </div>
                <div className="controls" style={{justifyContent: playersTurn === true ? 'flex-start' : 'flex-end'}}>
                    <div className="attack" >
                        <button id="attack" ref={element} >Attack!</button>
                    </div>
                </div>
            </nav> */}
        </>
    );
}