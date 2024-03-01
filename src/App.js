import './App.css';
import opponent_Data from './data/opponent.json';
import player_Data from './data/player.json';
import { useState } from 'react';
import GameScreen from './screens/GameScreen.js';

export default function App() {
  const [player, setPlayer] = useState('');
  const [opponent, setOpponent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useState(() => {
    setIsLoading(true)
    let playerInfo = player_Data;
    let opponentInfo = opponent_Data;
    setPlayer(playerInfo)
    setOpponent(opponentInfo)
    setIsLoading(false)
  }, [player, setPlayer, opponent, setOpponent, setIsLoading])

 
    return (
      <div className="App">
       {isLoading === true ? <></> : <GameScreen isLoading={isLoading} player={player} opponent={opponent}></GameScreen>}
      </div>
    );

  
}