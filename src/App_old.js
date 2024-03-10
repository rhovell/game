import './App.scss';
import opponent_Data from './data/opponent.json';
import player_Data from './data/player.json';
import React, { useState, useCallback, useEffect } from 'react';
import SelectCardScreen from './screens/Select_card.js'
import BattleScreen from './screens/BattleScreen.js';
import GameButton from './screens/components/GameButton.js';
import attackList from './data/attack_sheet.json';

export default function App() {
  const [player] = useState(player_Data);
  const [opponent] = useState(opponent_Data);
  const [attacks] = useState(attackList);
  const [isLoading, setIsLoading] = useState(false);
  const [playerTeam, setPlayerTeam] = useState([])
  const [opponentTeam, setOpponentTeam] = useState([])
  const [playerReady, setPlayerReady] = useState(false)
  const [opponentReady, setOpponentReady] = useState(false)
  const [battleStart, setBattleStart] = useState(false)
  const [message, setMessage] = useState('');
  const [attacker, setAttacker] = useState('');
  const [defender, setDefender] = useState('');
  const [turnOrder, setTurnOrder] = useState([])
  const [turn, setTurn] = useState(1);
  const [round, setRound] = useState(1);
  // const [playersTurn, setPlayersTurn] = useState('');
  const [automated, setAutomated] = useState(false);
  const [winner, setWinner] = useState('');
  const [isAttacking, setIsAttacking] = useState(false)

  const element = React.useRef(null)

  const setCurrentDefender = useCallback((currentDefender) => {
      // setDefender(currentDefender)
      console.warn('currentDefender',currentDefender);
      let allPlayers = ([
        ...playerTeam,
        ...opponentTeam
      ])
      allPlayers.filter((a) => a.card.id === currentDefender.card.id)
      console.warn('allPlayers',allPlayers);
      // setTurnOrder(allPlayers)
      setDefender(allPlayers[0])
      // console.warn(attacker.card.creature, 'is attacking', currentDefender.card.creature);
      setMessage(`${attacker.card.creature} is attacking ${currentDefender.card.creature}`)
  }, [setDefender, attacker])
  
  const endGame = useCallback(() => {
      console.warn('someone died!');
      let winnerName;
      console.warn('playerTeam',playerTeam);
      console.warn('opponentTeam',opponentTeam);
      let playersDeceased = playerTeam.filter((member) => member.card.healthpoints <= 0)
      console.warn('playersDeceased', playersDeceased.length, 'out of', playerTeam.length);
      let opponentsDeceased = opponentTeam.filter((member) => member.card.healthpoints <= 0)
      console.warn('opponentsDeceased', opponentsDeceased.length, 'out of', opponentTeam.length);
      if(opponentsDeceased.length === opponentTeam.length){
        console.warn('all opponants died!');
        setWinner('You lost!')
        setMessage('You lost!')
      } else if(playersDeceased.length === playerTeam.length){
        console.warn('all players died!');
        setWinner('Player wins!')
        setMessage('Player wins!')
      } else {
        switchPlayer()
      }
      setAutomated(false)
      return winnerName

  }, [setWinner, setAutomated, playerTeam, opponentTeam])

  function tryAgain(){
      console.warn(attacker.card.creature, 'tries again');
      if(attacker.card.healthpoints > 0 && defender.card.healthpoints > 0){
          if(attacker.card.healthpoints > 0 && defender.card.healthpoints > 0){
              calculateMiss(2)
          } 
      } else if(attacker.card.healthpoints <= 0 || defender.card.healthpoints <= 0){
          endGame()
      }
  }
  
  function switchPlayer(){
    setIsAttacking(false)
      console.warn('*********** switchPlayer ******************');
      console.warn(`*********** end turn ${turn} ******************`);
      console.warn('last turnOrder',turnOrder);
      console.warn('last attacker',attacker);

      setTurn(turn => turn + 1)
      let allPlayers = ([
        ...playerTeam,
        ...opponentTeam
      ])
      if(turn % allPlayers.length === 0){
        console.warn('round over');
        setMessage(`Round ${round} over`)
        setRound(round => round + 1)
        allPlayers.sort(
          function(a, b) {          
             if (a.speed === b.speed) {
                // Price is only important when cities are the same
                if(b.level === a.level){
                  if(a.weaponskill === b.weaponskill){
                    return Math.random();
                  }
                  return b.weaponskill - a.weaponskill;
                }
                return b.level - a.level;
             }
             return a.speed > b.speed ? 1 : -1;
          }).filter(player => player.healthpoints <= 0);
        setTurnOrder(allPlayers)
        setAttacker(allPlayers[0])
      } else {
        let newTurnOrder = turnOrder.filter(a => a.card.id !== attacker.card.id)
        console.warn('newTurnOrder',newTurnOrder);
  
        setTurnOrder(newTurnOrder)
        setAttacker(newTurnOrder[0])
        // if(!message){
          setMessage(`${newTurnOrder[0].card.creature} goes next`)
  
        // }
        
      }
      



      console.warn('end round', round, 'turn', turn);

      if (attacker.card.healthpoints > 0 && defender.card.healthpoints > 0) {
          if(automated === true){
              runTurn(attacker, defender)
          }
      } else if (attacker.card.healthpoints <= 0 || defender.card.healthpoints <= 0) {
          endGame()
      }

      
  }

//  If the first attack missed, the attacker has another chance of attacking.
  function miss (attackNumber){
      console.warn(attacker.card.creature, attackNumber, ' attack missed!');
      if(attackNumber === 1){
        setMessage(`${attacker.card.creature} first attack missed!`)
          // If the first attack missed, the attacker has another chance of attacking.
          tryAgain()
      } else {
        setMessage(`${attacker.card.creature} second attack missed!`)
          if (attacker.card.healthpoints > 0 && defender.card.healthpoints > 0) {
              switchPlayer()
          } else if(attacker.card.healthpoints <= 0 || defender.card.healthpoints <= 0){
              endGame()
          }
      }
  }
          
  // Calculate the chance that the attacker will miss their attack
  function calculateMiss(attackNumber) {
      
      let missChance = 1 * ((defender.card.speed * defender.card.weaponskill) / (attacker.card.speed * attacker.card.weaponskill))
      console.warn(attacker.card.creature, 'has', missChance, '% chance of miss on attack number ', attackNumber) ;
      // Dependant on their chances, run hit or miss:
      var random = Math.random() * 100;
      if (random > 0 && random < missChance) {
          miss(attackNumber)
      } else if (random >= missChance && random < 100) {
          hit(attackNumber)
      }

  }

  
  function runTurn(){

      calculateMiss(1)
  }


  // If the attack landed
  function hit(attackNumber){
    setMessage(`${attacker.card.creature} attack number ${attackNumber} Landed!`)
      // console.warn(attacker.card.creature, attackNumber Hit!);
      calculateParry(attackNumber)
  }

  // calculate the chance of the defender parrying the attack
  function calculateParry(attackNumber){
      let parryChance = 2 * (defender.card.speed * defender.card.weaponskill * defender.card.toughness) / (attacker.card.speed * attacker.card.weaponskill * attacker.card.strength)
      console.warn(defender.card.creature, 'has', parryChance, '% chance of parry on ', attackNumber, 'attack');
      var random = Math.random() * 100;
      if (random > 0 && random < parryChance) {
          parried(attackNumber)
      } else if (random >= parryChance && random < 100) {
          connected(attackNumber)
      }
  }


  function parried(attackNumber){
    setMessage(`${defender.card.creature} parried attack number ${attackNumber}!`)
    
      console.warn(defender.card.creature, 'parried! the ', attackNumber, 'attack');
      if(attackNumber === 1){
          // If the defender parried the first attack, the attacker has another chance of attacking.
          tryAgain()
      } else {
          // if parried, the round is over
          switchPlayer()
      }
  }

  // If the defender failed to parry and the attacker connects, then calculate damage:
  function connected(attackNumber){
    setMessage(`${defender.card.creature} failed to parry attack number ${attackNumber}!`)

      console.warn(attacker.card.creature, attackNumber, 'hit connected!');
      calculateDamage(attackNumber)
  }

  function calculateDamage(attackNumber){
      let damageDealt = Math.round(((attacker.card.weaponskill * attacker.card.strength) * (attacker.card.strength / defender.card.toughness)) /2)
      console.warn(attacker.card.creature, 'dealt', damageDealt, 'damage to', defender.card.creature, 'on', attackNumber, 'attack');
      let newHealth = defender.card.healthpoints - damageDealt;
      defender.card.healthpoints = newHealth;
      console.warn(defender.card.creature, 'healthpoints', defender.card.healthpoints);
      
      if(defender.card.healthpoints <= 0 ){
        setMessage(`${defender.card.creature} died!`)
        endGame()
      } else if(attackNumber === 1){
        setMessage(`${defender.card.creature} only has ${defender.card.healthpoints} left!`)
          tryAgain()
      } else if(attackNumber === 2){
        setMessage(`${defender.card.creature} only has ${defender.card.healthpoints} left!`)
          switchPlayer()
      }
  }



  const specialAttack = useCallback((chosenAttack) => {
    setIsAttacking(true)
      console.warn('attack', chosenAttack, attacks);
      let attackList = attacks.attacks.filter(attack => attack.Attackname === chosenAttack)
      console.warn(attackList);
      let currentAttack = attackList;
      console.warn(currentAttack);
      let currentTurn = turn;
      let attackDuration = currentAttack.duration;
      setMessage(`${attacker.card.creature} used ${chosenAttack} against ${defender}`)
      
      if(!defender && defender !== undefined && defender !== ''){
        setMessage(`Select someone to attack!`)

      } else {
        if(currentAttack.drain === false){
            console.warn('attack is boosting', attacker.card.creature);
            if(currentAttack.weaponskill !== 1){
                attacker.card.weaponskill = attacker.card.weaponskill * currentAttack.weaponskill;
            }
            if(currentAttack.speed !== 1){
                attacker.card.speed = attacker.card.speed * currentAttack.speed;
            }
            if(currentAttack.strength !== 1){
                attacker.card.strength = attacker.card.strength * currentAttack.strength;
            }
            if(currentAttack.toughness !== 1){
                attacker.card.toughness = attacker.card.toughness * currentAttack.toughness;
            }
            if(currentAttack.manapoints !== 1){
                attacker.card.manapoints = attacker.card.manapoints * currentAttack.manapoints;
            }
            if(currentAttack.magicresistance !== 1){
                attacker.card.magicresistance = attacker.card.magicresistance * currentAttack.magicresistance;
            }
        } else if(currentAttack.drain === true){
            console.warn('attack is draining', defender.card.creature);
            if(currentAttack.weaponskill !== 1){
                defender.card.weaponskill = defender.card.weaponskill * currentAttack.weaponskill;
            }
            if(currentAttack.speed !== 1){
                defender.card.speed = defender.card.speed * currentAttack.speed;
            }
            if(currentAttack.strength !== 1){
                defender.card.strength = defender.card.strength * currentAttack.strength;
            }
            if(currentAttack.toughness !== 1){
                defender.card.toughness = defender.card.toughness * currentAttack.toughness;
            }
            if(currentAttack.manapoints !== 1){
                defender.card.manapoints = defender.card.manapoints * currentAttack.manapoints;
            }
            if(currentAttack.magicresistance !== 1){
                defender.card.magicresistance = defender.card.magicresistance * currentAttack.magicresistance;
            }
        }
        runTurn(turn)

      }

  }, [attacker, defender, turn])

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

  const setGame = useCallback(() => {
    console.warn('battle ready');
    setBattleStart(true)
  }, [setBattleStart])

  const setTeam = useCallback(() => {
    console.warn('player ready');
    setPlayerReady(true)
  }, [setPlayerReady])

  const decideTurnOrder = useCallback(() => {
    let turnList = ([
      ...playerTeam,
      ...opponentTeam
    ])
    turnList.sort(
      function(a, b) {          
         if (a.speed === b.speed) {
            // Price is only important when cities are the same
            if(b.level === a.level){
              if(a.weaponskill === b.weaponskill){
                return Math.random();
              }
              return b.weaponskill - a.weaponskill;
            }
            return b.level - a.level;
         }
         console.warn(a.speed < b.speed ? 1 : -1);
         return a.speed < b.speed ? 1 : -1;
      });
    console.warn('turnList',turnList);
    setTurnOrder(turnList)
    setAttacker(turnList[0])
    setMessage(`${turnList[0].card.creature} attacks first`)
    setTimeout(function(){
      if(defender === ''){
        setMessage(`Select someone to attack`)
      }
    }, 5000)
    
  }, [turnOrder, playerTeam, opponentTeam])

  const setCompTeam = useCallback(() => {
    console.warn('opponent ready');
    setOpponentReady(true)
    setGame()
    decideTurnOrder()
  }, [setGame, setOpponentReady, decideTurnOrder])
  
  const selectPlayerCard = useCallback((data, id) => {
    let card = player.cardList.filter(key => key['id'] === id)
    card = card[0];
    console.warn('card[0]',card);
    if(playerTeam.length < 4){
      setPlayerTeam([...playerTeam,
      {card}])
    } 
  }, [playerTeam, player, setPlayerReady, setTeam])

  const selectOpponentCard = useCallback((data, id) => {
    let card = opponent.cardList.filter(key => key['id'] === id)
    card = card[0];
    console.warn('card',card);
    if(opponentTeam.length < 4){
      setOpponentTeam([...opponentTeam,
        {card}])
    } else if(opponentTeam.length === 4){
      setCompTeam()
    }
  }, [opponentTeam, opponent, setOpponentReady, setCompTeam])

 
    return (
      <div className="App">
       {isLoading === true ? <div className='loading-screen'>Loading... Please wait...</div> : 
              <div className="game-screen">

              {playerReady === false ?
                <div className='player-selection'>
                  <h3>Select Your Team</h3>
                  <SelectCardScreen 
                  deckList={player.cardList} 
                  selectTeamMember={selectPlayerCard}
                  >
                    <GameButton 
                      className={'setPlayerTeam'} 
                      action={setTeam}>
                        I'm Ready
                    </GameButton>
                  </SelectCardScreen>
                </div>
                :
                <></>
              }
    
              {playerReady === true && opponentReady === false ?
                <div className='opponent-selection'>
                  <h3>Select Your Victims</h3>
                  <SelectCardScreen 
                  deckList={opponent.cardList} 
                  selectTeamMember={selectOpponentCard}
                  >
                    <GameButton className={'start-battle'} action={setCompTeam}>Start Battle</GameButton>
                    </SelectCardScreen>
                </div>
                :
                <></>
              }
      
              {playerReady === true && opponentReady === true?
                <BattleScreen 
                playerTeam={playerTeam} 
                opponentTeam={opponentTeam} 
                attacker={attacker}
                defender={defender}
                message={message}
                round={round}
                turnOrder={turnOrder}
                // playersTurn={playersTurn}
                setCurrentDefender={setCurrentDefender}
                specialAttack={specialAttack}
                winner={winner}
                isAttacking={isAttacking}
                player={player}
                opponent={opponent}
                >
                </BattleScreen>
                :
                <></>
              }
          </div>
        
      }
      </div>
    );

  
}