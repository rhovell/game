import './App.scss';
import opponent_Data from './data/opponent.json';
import player_Data from './data/player.json';
import React, { useState, useCallback, useEffect, Suspense, startTransition } from 'react';

import attackList from './data/attack_sheet.json';
import EnterBattleScreen from "./screens/Battle_Screens/EnterBattleScreen";
import Layout from './Layout'

export default function App() {
  const player = player_Data;
  const opponent = opponent_Data;
  const [isLoading, setIsLoading] = useState(false);
  const [gameState, setGameState] = useState('game')

  return (
    <div className="App">
      <Layout>
        <Suspense fallback={<BigSpinner />}>
          <EnterBattleScreen
            player={player}
            opponent={opponent}
          >
          </EnterBattleScreen>
        </Suspense>
      </Layout>
    </div >
  )
}


function BigSpinner() {
  return <h2>🌀 Loading...</h2>;
}




