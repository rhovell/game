import { useState, useEffect } from 'react';
import SelectCardScreen from './Select_card.js'
import MainScreen from './main_game.js';

export default function GameScreen({player, opponent}) {
    const [playerCard, setPlayerCard] = useState('')

    function selectCard(card){
       let selectedCard = card.target.id;
    //    console.warn('selectedCard', selectedCard);
       let cardList = player.cardList;
       let choosenCard = cardList.filter( key => key['creature'] === selectedCard)
    //    console.warn(choosenCard);
       setPlayerCard(choosenCard)
     }
     

    return (
      <div className="game-screen">
        {playerCard === '' ?
        <SelectCardScreen deckList={player.cardList} selectCard={selectCard}></SelectCardScreen>
        :
        <></>}
        {playerCard != '' ? 
        <MainScreen playerCard={playerCard} opponent={opponent} player={player}></MainScreen>
      :
      <></>}
        
      </div>
    );

  
}