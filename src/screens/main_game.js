import './styles/MainScreen.css';
import React, { useCallback } from 'react';
import { useState, useEffect } from 'react';
// import opponent from '../data/opponent.json';
// import player from '../data/player.json';
import PlayerScreen from './PlayerScreen.js'
import NavBar from './components/navbar.js';


export default function MainScreen({playerCard, opponent, player}) {
// console.warn('playerCard', playerCard);
    const [round, setRound] = useState(0);
    const [playersTurn, setPlayersTurn] = useState(true);
    const [winner, setWinner] = useState('');

    
    const checkFastest = useCallback(() => {
        // console.warn('check fastest');
        // let playerInfo = player;
        let opponentInfo = opponent;
        // let playerCard = playerInfo.cardList[0];
        // console.warn('playerCard',playerCard);
        let player_speed = playerCard[0].speed;
        let opponentCard = opponentInfo.cardList[0];
        // console.warn('opponentCard',opponentCard);
        let opponent_speed = opponentCard.speed;
        let fastest = Math.max(player_speed, opponent_speed)
        if (fastest === player_speed) {
            console.warn(player.username, 'goes first');
            setPlayersTurn(true)
        } else {
            console.warn(opponent.username, 'goes first');
            setPlayersTurn(false)
        }
    }, [setPlayersTurn, player, opponent])

    useEffect(() => {
        checkFastest()
    }, [player, checkFastest]);
    
    const endGame = useCallback(() => {
        console.warn('end game!');
        let playerInfo = player;
        let opponentInfo = opponent;
        // let playerCard = playerC;
        // console.warn('playerCard',playerCard);
        let player_health = playerCard[0].healthpoints;
        let opponentCard = opponentInfo.cardList[0];
        let opponent_health = opponentCard.healthpoints;
        if(player_health <= 0){
            console.warn(opponentCard.creature, 'wins!');
            setWinner(opponentCard.creature)
        } else if(opponent_health <= 0){
            console.warn(playerCard[0].creature, 'wins!');
            setWinner(playerCard[0].creature)

        }

    }, [setWinner, player, opponent])

    const switchPlayer = useCallback(() => {
        
        setRound(round => round + 1)
        let attacker, defender;
        if (playersTurn === true) {
            attacker = opponent;
            defender = player;
            setPlayersTurn(false)
        } else {
            attacker = player;
            defender = opponent;
            setPlayersTurn(true)
        }

        if (attacker.healthpoints > 0 && defender.healthpoints > 0) {
            runTurn(attacker, defender)
        } else if(attacker.healthpoints <= 0 || defender.healthpoints <= 0){
            endGame()
        }
        
    }, [playersTurn, setPlayersTurn, endGame, player, opponent])


    const runTurn = useCallback((attacker, defender) => {
        setRound((round) => round+1)
        console.warn('round',round);
        // let attacker, defender;
        if(playersTurn === true){
            attacker = playerCard[0];
            defender = opponent.cardList[0];
        } else if(playersTurn === false){
            attacker = opponent.cardList[0];
            defender = playerCard[0];
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
            
            if (opponent.creature === defender.creature) {
                opponent.healthpoints = newHealth;
            } else if (player.creature === defender.creature) {
                player.healthpoints = newHealth;
            }
            console.warn(defender.creature, 'healthpoints', defender.healthpoints);
            // console.warn(attacker.creature, 'healthpoints', attacker.healthpoints);
            if(defender.healthpoints <= 0 ){
                endGame()
            }
        }
        
        function tryAgain(attacker, defender) {
            // let playerCard = player.cardList[0];
            // let opponentCard = opponent.cardList[1];
            // let player_speed = playerCard[0].speed;
            // let opponent_speed = opponentCard.speed;
            let newFastest = Math.max(attacker.speed, defender.speed)
            if (newFastest === attacker.speed) {
                if(attacker.healthpoints > 0 && defender.healthpoints > 0){
                    var random = Math.random() * 100;
                    let chanceOfAttack = ((attacker.speed * attacker.weaponskill) / (defender.weaponskill * defender.speed)) * 5;
                    console.warn('chance of second attack', chanceOfAttack);
                    if (random > 0 && random < chanceOfAttack) {
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
                console.warn('Second attack missed');
                if (attacker.healthpoints > 0 && defender.healthpoints > 0) {
                    switchPlayer()
                } else if(attacker.healthpoints <= 0 || defender.healthpoints <= 0){
                    endGame()
                }
            }

            function secondhit() {
                console.warn('second attack was successful!');
                calculateDamage()
                if (attacker.healthpoints > 0 && defender.healthpoints > 0) {
                    switchPlayer()
                } else if(attacker.healthpoints <= 0 || defender.healthpoints <= 0){
                    endGame()
                }
            }
        }
    
    }, [playersTurn, round, endGame, opponent, player, switchPlayer])

    return (
        <main className="main">
                <h2 className="round">Round {round === 0 ? 1 : Math.round(round/2)}</h2>
            <div className="main-game-area">
                <div className="player screen_half">
                    <div className="player-screen">
                        <PlayerScreen player={playerCard[0]}></PlayerScreen>
                    </div>
                </div>
                <div className="computer screen_half">
                    <div className="player-screen">
                        <PlayerScreen player={opponent.cardList[0]}></PlayerScreen>
                    </div>
                </div>
            </div>
            <h3 className='winner' winner={winner !== '' ? "true" : "false" }>{winner ? winner + ' Wins!' : ''}</h3>
            <NavBar playersTurn={playersTurn} runTurn={(attacker, defender) => runTurn(attacker, defender)}></NavBar>
        </main>
    );
}

