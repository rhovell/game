import './styles/MainScreen.css';
import React, { useCallback } from 'react';
import { useState, useEffect } from 'react';
// import opponent_Data from '../data/opponent.json';
// import player_Data from '../data/player.json';
import PlayerScreen from './PlayerScreen.js'
import NavBar from './components/navbar.js';

export default function MainScreen({player_Data, opponent_Data}) {

    const [round, setRound] = useState(0);
    const [playersTurn, setPlayersTurn] = useState(true);
    const [winner, setWinner] = useState('');

    
    const checkFastest = useCallback(() => {
        // console.warn('check fastest');
        let playerInfo = player_Data;
        let opponentInfo = opponent_Data;
        let playerCard = playerInfo.cardList[0];
        // console.warn('playerCard',playerCard);
        let player_speed = playerCard.speed;
        let opponentCard = opponentInfo.cardList[0];
        // console.warn('opponentCard',opponentCard);
        let opponent_speed = opponentCard.speed;
        let fastest = Math.max(player_speed, opponent_speed)
        if (fastest === player_speed) {
            setPlayersTurn(true)
        } else {
            setPlayersTurn(false)
        }
    }, [setPlayersTurn, player_Data, opponent_Data])

    useEffect(() => {
        checkFastest()
    }, [player_Data, checkFastest]);
    
    const endGame = useCallback(() => {
        console.warn('end game!');
        let playerInfo = player_Data;
        let opponentInfo = opponent_Data;
        let playerCard = playerInfo.cardList[0];
        // console.warn('playerCard',playerCard);
        let player_health = playerCard.healthpoints;
        let opponentCard = opponentInfo.cardList[0];
        let opponent_health = opponentCard.healthpoints;
        if(player_health <= 0){
            console.warn(opponentCard.creature, 'wins!');
            setWinner(opponentCard.creature)
        } else if(opponent_health <= 0){
            console.warn(playerCard.creature, 'wins!');
            setWinner(playerCard.creature)

        }

    }, [setWinner, player_Data, opponent_Data])

    const switchPlayer = useCallback(() => {
        
        setRound(round => round + 1)
        let attacker, defender;
        if (playersTurn === true) {
            attacker = opponent_Data;
            defender = player_Data;
            setPlayersTurn(false)
        } else {
            attacker = player_Data;
            defender = opponent_Data;
            setPlayersTurn(true)
        }

        if (attacker.healthpoints > 0 && defender.healthpoints > 0) {
            runTurn(attacker, defender)
        } else if(attacker.healthpoints <= 0 || defender.healthpoints <= 0){
            endGame()
        }
        
    }, [playersTurn, setPlayersTurn, endGame, player_Data, opponent_Data])


    const runTurn = useCallback((attacker, defender) => {
        setRound((round) => round+1)
        console.warn('round',round);
        // let attacker, defender;
        if(playersTurn === true){
            attacker = player_Data.cardList[0];
            defender = opponent_Data.cardList[0];
        } else if(playersTurn === false){
            attacker = opponent_Data.cardList[0];
            defender = player_Data.cardList[0];
        }
        var random = Math.random() * 100;
        console.warn('attacker is', attacker.creature, '- healthpoints: ', attacker.healthpoints);
        console.warn('defender is', defender.creature, '- healthpoints: ', defender.healthpoints);
        // console.warn('is it players turn?', playersTurn);
        // callstack 
        calculateMiss()
        
        
        function calculateMiss(){
            let missChance = 1 * ((defender.speed * defender.weaponskill) / (attacker.speed * attacker.weaponskill))
            console.warn(attacker.creature, missChance, 'chance of miss') ;
            // missChance;
            if (random > 0 && random < missChance) {
                miss()
            } else if (random >= missChance && random < 100) {
                hit()
            }

        }
        function miss() {
            console.warn(attacker.creature, 'missed!');
            tryAgain(attacker, defender)
        }
        function hit() {
            console.warn(attacker.creature, 'Hit!');
            calculateParry()
        }
    
        function calculateParry(){
            let parryChance = 2 * (defender.speed * defender.weaponskill * defender.toughness) / (attacker.speed * attacker.weaponskill * attacker.strength)
            console.warn(defender.creature, parryChance, 'chance of parry');
            if (random > 0 && random < parryChance) {
                parried()
            } else if (random >= parryChance && random < 100) {
                connected()
            }
        }

        function parried() {
            console.warn(defender.creature, 'parried!');
            tryAgain(attacker, defender)
        }
        function connected() {
            console.warn(attacker.creature, 'connected!');
            calculateDamage()
            setTimeout(() => {
                tryAgain(attacker, defender)

            },50)
        }

        function calculateDamage(){
            let damageDealt = Math.round(((attacker.weaponskill * attacker.strength) * (attacker.strength / defender.toughness)) /2)
            console.warn(attacker.creature, 'dealt', damageDealt, 'damage to', defender.creature);
            // console.warn('damage calc', attacker.weaponskill, attacker.strength, attacker.strength, defender.toughness);

            let newHealth = defender.healthpoints - damageDealt;
            defender.healthpoints = newHealth;
            
            if (opponent_Data.creature === defender.creature) {
                opponent_Data.healthpoints = newHealth;
            } else if (player_Data.creature === defender.creature) {
                player_Data.healthpoints = newHealth;
            }
            console.warn(defender.creature, 'healthpoints', defender.healthpoints);
            // console.warn(attacker.creature, 'healthpoints', attacker.healthpoints);
            if(defender.healthpoints <= 0 ){
                endGame()
            }
        }
        
        function tryAgain(attacker, defender) {
            // let playerCard = player_Data.cardList[0];
            // let opponentCard = opponent_Data.cardList[1];
            // let player_speed = playerCard.speed;
            // let opponent_speed = opponentCard.speed;
            let newFastest = Math.max(attacker.speed, defender.speed)
            if (newFastest === attacker.speed) {
                if(attacker.healthpoints > 0 && defender.healthpoints > 0){
                    var random = Math.random() * 100;
                    let chanceOfAttack = ((attacker.speed * attacker.weaponskill) / (defender.weaponskill * defender.speed)) * 5;
                    if (random > 0 && random < chanceOfAttack) {
                        console.warn('chance of second attack', chanceOfAttack);
                        secondhit()
                    } else if (random >= chanceOfAttack && random < 100) {
                        secondmiss()
                    }
                } else if(attacker.healthpoints <= 0 || defender.healthpoints <= 0){
                    endGame()
                }
            } else {
                switchPlayer()
            }

            function secondmiss() {
                console.warn('second attack missed, next turn/end game');
                if (attacker.healthpoints > 0 && defender.healthpoints > 0) {
                    switchPlayer()
                } else if(attacker.healthpoints <= 0 || defender.healthpoints <= 0){
                    endGame()
                }
            }

            function secondhit() {
                console.warn('second attack hit!');
                calculateDamage()
                if (attacker.healthpoints > 0 && defender.healthpoints > 0) {
                    switchPlayer()
                } else if(attacker.healthpoints <= 0 || defender.healthpoints <= 0){
                    endGame()
                }
            }
        }
    
    }, [playersTurn, round, endGame, opponent_Data, player_Data, switchPlayer])

    return (
        <main className="main">
                <h2 className="round">Round {round === 0 ? 1 : Math.round(round/2)}</h2>
            <div className="main-game-area">
                <div className="player screen_half">
                    <div className="player-screen">
                        <PlayerScreen player={player_Data}></PlayerScreen>
                    </div>
                </div>
                <div className="computer screen_half">
                    <div className="player-screen">
                        <PlayerScreen player={opponent_Data}></PlayerScreen>
                    </div>
                </div>
            </div>
            <h3 className='winner' winner={winner !== '' ? "true" : "false" }>{winner ? winner + ' Wins!' : ''}</h3>
            <NavBar playersTurn={playersTurn} runTurn={(attacker, defender) => runTurn(attacker, defender)}></NavBar>
        </main>
    );
}

