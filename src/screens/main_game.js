import './styles/MainScreen.css';
import React, { useCallback } from 'react';
import { useState, useEffect } from 'react';
// import opponent from '../data/opponent.json';
// import player from '../data/player.json';
import PlayerScreen from './PlayerScreen.js'


export default function MainScreen({ playerCard, opponentCard, opponent, player}) {
// console.warn('playerCard', playerCard);
//     console.warn('opponentCard', opponentCard);

    const [round, setRound] = useState(1);
    const [playersTurn, setPlayersTurn] = useState(true);
    const [winner, setWinner] = useState('');
    const [automated, setAutomated] = useState(false);
    const [turn, setTurn] = useState(1);
    const [attacker, setAttacker] = useState('');
    const [defender, setDefender] = useState('');
    
    // const [isAttack, setIsAttack] = useState(false);


    
    useState(() => {
        // console.warn('useState');
        let player_speed = playerCard[0].speed;
        let opponent_speed = opponentCard[0].speed;
        let fastest = Math.max(player_speed, opponent_speed)
        if (fastest === player_speed) {
            setPlayersTurn(true)
            setAttacker(playerCard[0])
            setDefender(opponentCard[0])
            
        console.warn('attacker is', playerCard[0].creature, '- healthpoints: ', playerCard[0].healthpoints);
        console.warn('defender is', opponentCard[0].creature, '- healthpoints: ', opponentCard[0].healthpoints);
        } else {
            setPlayersTurn(false)
            setDefender(playerCard[0])
            setAttacker(opponentCard[0])
            
        console.warn('attacker is', playerCard[0].creature, '- healthpoints: ', playerCard[0].healthpoints);
        console.warn('defender is', opponentCard[0].creature, '- healthpoints: ', opponentCard[0].healthpoints);
        }
    }, [setPlayersTurn, playerCard, opponentCard, setAttacker, setDefender])

    
    const endGame = useCallback(() => {
        console.warn('end game!');
        // let player_health = attacker.healthpoints;
        // let opponent_health = defender.healthpoints;
        let winnerName;
        if(attacker.healthpoints <= 0){
            console.warn(attacker.creature, 'wins!');
            setWinner(attacker)
            winnerName = attacker.creature
        } else if(defender.healthpoints <= 0){
            console.warn(defender.creature, 'wins!');
            setWinner(defender.creature)
            winnerName = defender.creature
        }
        setAutomated(false)
        return winnerName
        
        // setAutomated(false)
    }, [setWinner, opponentCard, playerCard, setAutomated])

    const switchPlayer = useCallback(() => {
        
        console.warn('*********** switchPlayer ******************');
        console.warn(`*********** end turn ${turn} ******************`);

        setTurn(turn => turn + 1)
        if(turn % 2 === 0){
            // even turns
            setRound(round => round + 1)
        }
        console.warn('end round', round, 'turn', turn);
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
            if(automated === true){
                runTurn(attacker, defender)
            }
        } else if (attacker.healthpoints <= 0 || defender.healthpoints <= 0) {
            endGame()
        }

        
    }, [playersTurn, setPlayersTurn, endGame, player, opponent, turn, round, attacker, defender, automated, opponentCard, playerCard, playersTurn])

   // If the first attack missed, the attacker has another chance of attacking.
   const miss = useCallback((attackNumber) => {
        console.warn(attacker.creature, attackNumber, ' attack missed!');
        if(attackNumber === 1){
            // If the first attack missed, the attacker has another chance of attacking.
            tryAgain(attacker, defender)
        } else {
            if (attacker.healthpoints > 0 && defender.healthpoints > 0) {
                switchPlayer()
            } else if(attacker.healthpoints <= 0 || defender.healthpoints <= 0){
                endGame()
            }
        }
    }, [attacker, defender, switchPlayer, endGame, tryAgain])
            
    // Calculate the chance that the attacker will miss their attack
    const calculateMiss = useCallback((attackNumber) => {
        let missChance = 1 * ((defender.speed * defender.weaponskill) / (attacker.speed * attacker.weaponskill))
        console.warn(attacker.creature, 'has', missChance, '% chance of miss on attack number ', attackNumber) ;
        // Dependant on their chances, run hit or miss:
        var random = Math.random() * 100;
        if (random > 0 && random < missChance) {
            miss(attackNumber)
        } else if (random >= missChance && random < 100) {
            hit(attackNumber)
        }

    }, [attacker, defender, hit, miss])

    
    const runTurn = useCallback(() => {
        
        console.warn('**************** New Turn ***********');        
        calculateMiss(1)
    }, [calculateMiss])

 
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
            tryAgain(attacker, defender)
        } else if(attackNumber === 2){
            switchPlayer()
        }
    }
    
    function tryAgain(attacker, defender) {
        console.warn(attacker.creature, 'tries again');
        if(attacker.healthpoints > 0 && defender.healthpoints > 0){
            if(attacker.healthpoints > 0 && defender.healthpoints > 0){
                calculateMiss(2)
            } 
        } else if(attacker.healthpoints <= 0 || defender.healthpoints <= 0){
            endGame()
        }
    }

    const element = React.useRef(null)

    function setAuto(){
        // console.warn('setauto');
        element.current.click()
        setAutomated(true)
    }

    useEffect(() => {
        if(automated === true){
            if(winner === ""){
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
                    <h2 className="round">Round {round}</h2>
                <div className="main-game-area">
                    <div className="player screen_half">
                        <div className="player-screen">
                            <PlayerScreen attacker={attacker} defender={defender} playersTurn={playersTurn} playerInfo={player} playerCard={playerCard[0]} onClick={runTurn}></PlayerScreen>
                        </div>
                    </div>
                    <div className="computer screen_half">
                        <div className="player-screen">
                            <PlayerScreen attacker={attacker} defender={defender} playersTurn={playersTurn} playerInfo={opponent} playerCard={opponentCard[0]} onClick={runTurn}></PlayerScreen>
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

