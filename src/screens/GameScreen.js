import { useState, useEffect } from 'react';
import SelectCardScreen from './Select_card.js'
import MainScreen from './main_game.js';

export default function GameScreen({player, opponent}) {
  const [playerCard, setPlayerCard] = useState('')
  const [opponentCard, setOpponentCard] = useState('')


    function selectPlayerCard(card){
       let selectedCard = card.target.id;
       console.warn('selectedCard', selectedCard);
       let cardList = player.cardList;
       let choosenCard = cardList.filter( key => key['creature'] === selectedCard)
    //    console.warn(choosenCard);
       setPlayerCard(choosenCard)
     }
     

  function selectOpponentCard(card) {
    let selectedCard = card.target.id;
    console.warn('selectedCard', selectedCard);
    let cardList = opponent.cardList;
    let choosenCard = cardList.filter(key => key['creature'] === selectedCard)
    // console.warn(choosenCard);
    setOpponentCard(choosenCard)
  }

    return (
      <div className="game-screen">
        
          {playerCard === '' ?
            <div className='player-selection'>
              <h3>Select Your Creature</h3>
              <SelectCardScreen deckList={player.cardList} selectCard={selectPlayerCard} selectOpponentCard={selectOpponentCard}></SelectCardScreen>
            </div>
          :
          <></>}

        
          {playerCard !== '' && opponentCard === '' ? 
          <div className='opponent-selection'>
            <h3>Select Your Victim</h3>
            <SelectCardScreen deckList={opponent.cardList} selectCard={selectOpponentCard} ></SelectCardScreen>
          </div>
          :
          <></>}

        {playerCard !== '' && opponentCard !== '' ? 
          <MainScreen playerCard={playerCard} opponentCard={opponentCard} opponent={opponent} player={player}></MainScreen>
      :
      <></>}
        
      </div>
    );

  
}