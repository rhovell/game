import './App.css';
import MainScreen from './screens/main_game.js'
import opponent_Data from './data/opponent.json';
import player_Data from './data/player.json';
import { useState, useEffect } from 'react';


export default function App() {
  const [player, setPlayer] = useState('');
  const [computer, setComputer] = useState('');

  useEffect(() => {
    let playerInfo = player_Data;
    let opponentInfo = opponent_Data;
    setPlayer(playerInfo)
    setComputer(opponentInfo)
  }, [player, setPlayer, computer, setComputer])
  
    return (
      <div className="App">
        <MainScreen opponent_Data={opponent_Data} player_Data={player_Data}></MainScreen>
        
      </div>
    );

  
}