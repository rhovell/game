import './App.css';
import opponent_Data from './data/opponent.json';
import player_Data from './data/player.json';
import { useState } from 'react';
import GameScreen from './screens/GameScreen.js';

export default function App() {
  const [player, setPlayer] = useState('');
  const [opponent, setOpponent] = useState('');


  useState(() => {
    let playerInfo = player_Data;
    let opponentInfo = opponent_Data;
    setPlayer(playerInfo)
    setOpponent(opponentInfo)
  }, [player, setPlayer, opponent, setOpponent])

 
    return (
      <div className="App">
       
      <GameScreen player={player} opponent={opponent}></GameScreen>
        
        
      </div>
    );

  
}