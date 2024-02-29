import './styles/MainScreen.css';
import React, { useCallback } from 'react';
import { useState, useEffect } from 'react';
// import opponent from '../data/opponent.json';
// import player from '../data/player.json';
import PlayerScreen from './PlayerScreen.js'


export default function MainScreen({ playerCard, opponentCard, opponent, player}) {
// console.warn('playerCard', playerCard);
//     console.warn('opponentCard', opponentCard);

    const [round, setRound] = useState(0);
    const [playersTurn, setPlayersTurn] = useState(true);
    const [winner, setWinner] = useState('');
    const [automated, setAutomated] = useState('');
    const [turn, setTurn] = useState(0);
    const [attacker, setAttacker] = useState('');
    const [defender, setDefender] = useState('');
    
    useState(() => {
        let player_speed = playerCard[0].speed;
        let opponent_speed = opponentCard[0].speed;
        let fastest = Math.max(player_speed, opponent_speed)
        if (fastest === player_speed) {
            setPlayersTurn(true)
            setAttacker(playerCard[0])
            setDefender(opponentCard[0])

        } else {
            setPlayersTurn(false)
            setDefender(playerCard[0])
            setAttacker(opponentCard[0])

        }
    }, [setPlayersTurn, playerCard, opponentCard, setAttacker, setDefender])

    // useEffect(() => {
    //     console.warn('turn change', turn);
    //     if(turn % 2 === 0){
    //         setRound(round => round + 1)
    //         console.warn('round change', round);
    //     }
    // }, [turn, setRound]);


    
    const endGame = useCallback(() => {
        console.warn('end game!');
        let player_health = playerCard[0].healthpoints;
        let opponent_health = opponentCard[0].healthpoints;
        let winnerName;
        if(player_health <= 0){
            console.warn(opponentCard[0].creature, 'wins!');
            setWinner(opponentCard[0].creature)
            winnerName = opponentCard[0].creature
        } else if(opponent_health <= 0){
            console.warn(playerCard[0].creature, 'wins!');
            setWinner(playerCard[0].creature)
            winnerName = playerCard[0].creature
        }
        setAutomated(false)
        return winnerName
        
        // setAutomated(false)
    }, [setWinner, opponentCard, playerCard, setAutomated])

    const switchPlayer = useCallback(() => {
        
        setRound(round => round + 1)
        
        console.warn('turn', turn, 'round', round);
        let attacker, defender;
        if (playersTurn === false) {
            setPlayersTurn(true)
            setAttacker(playerCard[0])
            setDefender(opponentCard[0])

        } else {
            setPlayersTurn(false)
            setDefender(playerCard[0])
            setAttacker(opponentCard[0])

        }

        if (attacker.healthpoints > 0 && defender.healthpoints > 0) {
            console.warn('attacker', attacker.creature);
            console.warn('defender', defender.creature);
            runTurn(attacker, defender)
        } else if (attacker.healthpoints <= 0 || defender.healthpoints <= 0) {
            endGame()
        }
        
    }, [playersTurn, setPlayersTurn, endGame, player, opponent])

 
    const checkFastest = useCallback(() => {
        let player_speed = playerCard[0].speed;
        let opponent_speed = opponentCard[0].speed;
        let fastest = Math.max(player_speed, opponent_speed)
        if (fastest === player_speed) {
            setPlayersTurn(true)
            setAttacker(playerCard[0])
            setDefender(opponentCard[0])

        } else {
            setPlayersTurn(false)
            setDefender(playerCard[0])
            setAttacker(opponentCard[0])

        }
        return fastest;
    })

    const runTurn = useCallback(() => {
        setTurn(turn => turn + 1)
        console.warn('turn', turn);
        let player_speed = playerCard[0].speed;
        let opponent_speed = opponentCard[0].speed;
        let fastest = Math.max(player_speed, opponent_speed)
        // let attacker, defender;
        if(turn % 2 === 0){
            if (fastest === player_speed) {
                console.warn(player.username, 'goes first');
                // attacker = playerCard[0];
                // defender = opponentCard[0];
            } else {
                console.warn(opponent.username, 'goes first');
                // attacker = opponentCard[0];
                // defender = playerCard[0];
            }
        }
        
        console.warn('attacker is', attacker.creature, '- healthpoints: ', attacker.healthpoints);
        console.warn('defender is', defender.creature, '- healthpoints: ', defender.healthpoints);
        
        calculateMiss(1)

    
    })

            
    // Calculate the chance that the attacker will miss their attack
    function calculateMiss(attackNumber){
        let missChance = 1 * ((defender.speed * defender.weaponskill) / (attacker.speed * attacker.weaponskill))
        console.warn(attacker.creature, missChance, 'chance of miss on attack number ', attackNumber) ;
        // Dependant on their chances, run hit or miss:
        var random = Math.random() * 100;
        if (random > 0 && random < missChance) {
            miss(attackNumber)
        } else if (random >= missChance && random < 100) {
            hit(attackNumber)
        }

    }

    // If the first attack missed, the attacker has another chance of attacking.
    function miss(attackNumber) {
        console.warn(attacker.creature, attackNumber, ' attack missed!');
        if(attackNumber === 1){
            // If the first attack missed, the attacker has another chance of attacking.
            tryAgain(attacker, defender)
        } else {
            console.warn('Second attack missed');
            if (attacker.healthpoints > 0 && defender.healthpoints > 0) {
                switchPlayer()
            } else if(attacker.healthpoints <= 0 || defender.healthpoints <= 0){
                endGame()
            }
        }
    }
    // If the attack landed
    function hit(attackNumber) {
        console.warn(attacker.creature, attackNumber, 'attack Hit!');
        calculateParry(attackNumber)
    }
    // calculate the chance of the defender parrying the attack
    function calculateParry(attackNumber){
        let parryChance = 2 * (defender.speed * defender.weaponskill * defender.toughness) / (attacker.speed * attacker.weaponskill * attacker.strength)
        console.warn(defender.creature, 'has', parryChance, '% chance of parry on ', attackNumber, 'attack');
        var random = Math.random() * 100;
        if (random > 0 && random < parryChance) {
            parried(attackNumber)
        } else if (random >= parryChance && random < 100) {
            connected(attackNumber)
        }
    }

    function parried(attackNumber) {
        console.warn(defender.creature, 'parried! the ', attackNumber, 'attack');
        if(attackNumber === 1){
            // If the defender parried the first attack, the attacker has another chance of attacking.
            tryAgain(attacker, defender)
        } else {
            // if parried, the round is over
            switchPlayer()
        }
    }
    // If the defender failed to parry and the attacker connects, then calculate damage:
    function connected(attackNumber) {
        console.warn(attacker.creature, attackNumber, 'hit connected!');
        calculateDamage(attackNumber)
        if(attackNumber === 1){
            setTimeout(() => {
                // The attacker then has another chance of attacking.
                tryAgain(attacker, defender)
            },50)
        }
    }

    function calculateDamage(attackNumber){
        let damageDealt = Math.round(((attacker.weaponskill * attacker.strength) * (attacker.strength / defender.toughness)) /2)
        console.warn(attacker.creature, 'dealt', damageDealt, 'damage to', defender.creature, 'on', attackNumber, 'attack');
        let newHealth = defender.healthpoints - damageDealt;
        defender.healthpoints = newHealth;
        if (opponent.creature === defender.creature) {
            opponent.healthpoints = newHealth;
        } else if (player.creature === defender.creature) {
            player.healthpoints = newHealth;
        }
        console.warn(defender.creature, 'healthpoints', defender.healthpoints);
        
        if(defender.healthpoints <= 0 ){
            endGame()
        } else if(attackNumber === 1){
            switchPlayer()
        }
    }
    
    function tryAgain(attacker, defender) {
        let newFastest = Math.max(attacker.speed, defender.speed)
        if (newFastest === attacker.speed) {
            if(attacker.healthpoints > 0 && defender.healthpoints > 0){
                calculateMiss(2)
            } else if(attacker.healthpoints <= 0 || defender.healthpoints <= 0){
                endGame()
            }
        } else {
            switchPlayer()
        }


    }

    const element = React.useRef(null)

    function setAuto(){
        console.warn('setauto');
        element.current.click()
        setAutomated(true)
    }

    useEffect(() => {
        if(automated === true){
            if(winner == ""){
                const interval = setInterval(() => {
                    element.current.click()
                  }, 2500);
                  return () => clearInterval(interval);
            }
        }
    }, [automated, setAutomated])

    return (
        <>
            <main className="main">
                    <h2 className="round">Round {round === 0 ? 1 : Math.round(round/2)}</h2>
                <div className="main-game-area">
                    <div className="player screen_half">
                        <div className="player-screen">
                            <PlayerScreen playerInfo={player} playerCard={playerCard[0]} onClick={runTurn}></PlayerScreen>
                        </div>
                    </div>
                    <div className="computer screen_half">
                        <div className="player-screen">
                            <PlayerScreen playerInfo={opponent} playerCard={opponentCard[0]} onClick={runTurn}></PlayerScreen>
                        </div>
                    </div>
                </div>
                <h3 className='winner' winner={winner !== '' ? "true" : "false" }>{winner ? winner + ' Wins!' : ''}</h3>
            </main>
            <nav>
                <div className='automate-button'>
                    <button id="automate" onClick={setAuto}>Run Whole Match</button>
                </div>
                <div className="controls" style={{justifyContent: playersTurn === true ? 'flex-start' : 'flex-end'}}>
                    <div className="attack" >
                        <button id="attack" ref={element} onClick={runTurn}>Attack!</button>
                    </div>
                </div>
            </nav>
        </>
    );
}

