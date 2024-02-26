import './styles/MainScreen.css';
import React from 'react';
import { useState, useEffect } from 'react';
import opponent_Data from '../data/opponent.json';
import player_Data from '../data/player.json';
import PlayerScreen from './PlayerScreen.js'
import NavBar from './components/navbar.js';

export default function MainScreen() {

    const [attacker, setAttacker] = useState('');
    const [defender, setDefender] = useState('');
    const [player, setPlayer] = useState('');
    const [computer, setComputer] = useState('');
    const [round, setRound] = useState(1);

    useEffect(() => {
        let playerInfo = player_Data;
        let opponentInfo = opponent_Data;
        setPlayer(playerInfo)
        setComputer(opponentInfo)
 
        console.warn('decision', player);
        let playerCard = player.cardList[0];
        let player_speed = playerCard.speed;
        let opponentCard = computer.cardList[0];
        let opponent_speed = opponentCard.speed;
        let fastest = Math.max(player_speed, opponent_speed)
        // console.warn('fastest', fastest);
        if (fastest === player_speed) {
            setAttacker(playerCard)
            setDefender(opponentCard)
        } else {
            setAttacker(opponentCard)
            setDefender(playerCard)
        }
    }, [player, setPlayer, computer, setComputer, attacker, defender]);


    useEffect(() => {
        // function runTurn(){
            // console.warn('attacker',attacker);
            
            var random = Math.random() * 100;
    
            // callstack 
            calculateMiss()
            
            
            function calculateMiss(){
                let missChance = 1 * ((defender.speed * defender.weaponskill) / (attacker.speed * attacker.weaponskill))
                console.warn('missChance', attacker.creature, missChance);
                // missChance;
                if (random > 0 && random < missChance) {
                    miss()
                } else if (random >= missChance && random < 100) {
                    hit()
                }
    
            }
            function miss() {
                // console.warn('miss');
                tryAgain()
            }
            function hit() {
                console.warn('hit');
                let parryChance = 2 * (defender.speed * defender.weaponskill * defender.toughness) / (attacker.speed * attacker.weaponskill * attacker.strength)
                console.warn('parryChance', defender.creature, parryChance);
                calculateParry()
            }
        
            function calculateParry(){
                let parryChance = 2 * (defender.speed * defender.weaponskill * defender.toughness) / (attacker.speed * attacker.weaponskill * attacker.strength)
                console.warn('parryChance', defender.creature, parryChance);
                if (random > 0 && random < parryChance) {
                    parried()
                } else if (random >= parryChance && random < 100) {
                    connected()
                }
            }
    
            function parried() {
                // console.warn(defender.creature, 'parried');
                tryAgain()
            }
            function connected() {
                console.warn(attacker.creature, 'connected');
                calculateDamage()
                tryAgain()
            }
    
            function calculateDamage(){
                let damageDealt = Math.round((attacker.weaponskill * attacker.strength) * (attacker.strength / defender.toughness))
                console.warn(attacker.creature, 'damagedealt', damageDealt, ' to ', defender.creature);
    
                let newHealth = defender.healthpoints - damageDealt;
                defender.healthpoints = newHealth;
                console.warn('defender.healthpoints', defender.healthpoints);
                if (computer.creature === defender.creature) {
                    computer.healthpoints = newHealth;
                } else if (player.creature === defender.creature) {
                    player.healthpoints = newHealth;
                }
            }
            function tryAgain() {
                let playerCard = player.cardList[0];
                let opponentCard = computer.cardList[1];
                let player_speed = playerCard.speed;
                let opponent_speed = opponentCard.speed;
                let newFastest = Math.max(player_speed, opponent_speed)
                if (newFastest === player_speed) {
                    var random = Math.random() * 100;
                    let chanceOfAttack = (player_speed / defender.speed) * 5;
                    console.warn('chanceOfAttack', chanceOfAttack);
                    if (random > 0 && random < chanceOfAttack) {
                        secondhit()
                    } else if (random >= chanceOfAttack && random < 100) {
                        secondmiss()
                    }
                }
            }
            function secondmiss() {
                console.warn('second miss');
                // endTurn()
            }
            function secondhit() {
                console.warn('second hit');
                calculateDamage()
                // endTurn()
            }
        
        // }
    }, [round, attacker, defender, player, computer])

    useEffect(() => {
            function switchPlayer(){
            let playerCard = player.cardList[0];
            let opponentCard = computer.cardList[0];
            if (playerCard.creature === attacker.creature) {
                setAttacker(opponentCard)
                setDefender(playerCard)
            } else if (opponentCard.creature === attacker.creature) {
                setAttacker(playerCard)
                setDefender(opponentCard)
            }
        }
        }, [player, computer, attacker, defender])
    
    useEffect(() => {
        // function // endTurn() {
            setRound(round => round + 1)
            console.warn('end turn round:', round);
            let playerCard = player.cardList[0];
            let opponentCard = computer.cardList[0];
            if (playerCard.healthpoints > 0 && opponentCard.healthpoints > 0) {
                // switchPlayer()
                // runTurn()
    
            } else if(playerCard.healthpoints <= 0 || opponentCard.healthpoints <= 0){
                console.warn('end game!', );
            }
    
        // }
    }, [player, computer, attacker, defender, round])

    

    return (
        <main className="main">
            <div className="main-game-area" attacker={attacker}>
                <div className="player screen_half">
                    <div className="player-screen">
                        <PlayerScreen player={player_Data}></PlayerScreen>
                    </div>
                </div>
                <div className="computer screen_half">
                    <div className="opponent-screen">
                        <PlayerScreen player={opponent_Data}></PlayerScreen>
                    </div>
                </div>
            </div>
            <NavBar ></NavBar>
        </main>
    );
}

