// import opponent_Data from '../../data/opponent.json';
// import player_Data from '../../data/player.json';
import attackList from '../../data/attack_sheet.json';
import React, { useState, useCallback, useEffect } from 'react';
import SelectCardScreen from './components/Select_card.js'
import BattleScreen from './BattleScreen.js';
import GameButton from './components/GameButton.js';

export default function EnterBattleScreen({
    player,
    opponent
}) {
    // const player = player;
    const playerDeck = player.cardList;
    const [playerTeam, setPlayerTeam] = useState([]);

    // const opponent = opponent;
    const opponentDeck = opponent.cardList;
    const [opponentTeam, setOpponentTeam] = useState([]);

    const [allPlayers, setAllPlayers] = useState([])

    const [attacks] = useState(attackList);

    const [isLoading, setIsLoading] = useState(false);

    const [message, setMessage] = useState('');
    const [battleState, setBattleState] = useState('');

    const [gameState, setGameState] = useState('game')

    function startBattle() {
        setGameState('battle-arena')
        setBattleState('player-selection')
    }

    function setTeam() {
        console.warn('player ready');
        setBattleState('opponent-selection')
    }

    function setCompTeam() {
        console.warn('opponent ready');
        if (allPlayers === '') {
            setIsLoading(true)
        } else {
            setIsLoading(false)
        }
        setAllTeam()
        setBattleState('battle')
    }

    function selectPlayerCard(event, id) {
        // event.preventDefault()
        let card = playerDeck.filter(key => key['id'] === id)
        card = card[0];
        console.warn('card[0]', card);
        if (playerTeam.length < 4) {
            setPlayerTeam([...playerTeam,
            { card }])
        }
    }

    function selectOpponentCard(event, id) {
        // event.preventDefault()
        let card = opponentDeck.filter(key => key['id'] === id)
        card = card[0];
        console.warn('card', card);
        if (opponentTeam.length < 4) {
            setOpponentTeam([
                ...opponentTeam,
                { card }])

        } else if (opponentTeam.length === 4) {
            setCompTeam()
        }
    }

    function setAllTeam() {
        setAllPlayers([
            ...playerTeam,
            ...opponentTeam])
    }


    return (
        <div className="App">
            {isLoading === true ? <div className='loading-screen'>Loading... Please wait...</div> :

                <div className='game'>


                    {gameState === 'battle-arena' ?
                        <div className="battle-screen">
                            {battleState === 'player-selection' ?
                                <div className='player-selection'>
                                    <h3>Select Your Team</h3>
                                    <SelectCardScreen
                                        deckList={player.cardList}
                                        selectTeamMember={selectPlayerCard}
                                    >
                                        <GameButton
                                            className={'setPlayerTeam'}
                                            action={setTeam}
                                        >
                                            I'm Ready
                                        </GameButton>
                                    </SelectCardScreen>
                                </div>
                                :
                                <></>
                            }


                            {battleState === 'opponent-selection' ?
                                <div className='opponent-selection'>
                                    <h3>Select Your Victims</h3>
                                    <SelectCardScreen
                                        deckList={opponent.cardList}
                                        selectTeamMember={selectOpponentCard}
                                    >
                                        <GameButton className={'start-battle'}
                                            action={setCompTeam}>Start Battle</GameButton>
                                    </SelectCardScreen>
                                </div>
                                :
                                <></>
                            }

                            {battleState === 'battle' && allPlayers !== '' ?
                                <BattleScreen
                                    playerTeam={playerTeam}
                                    opponentTeam={opponentTeam}
                                    message={message}
                                    attacks={attacks}
                                    player={player}
                                    opponent={opponent}
                                    setMessage={setMessage}
                                    allPlayers={allPlayers}
                                    setIsLoading={setIsLoading}
                                >
                                </BattleScreen>
                                :
                                <></>
                            }
                        </div>
                        :
                        <GameButton className={'start-battle button'} action={startBattle}>Start Battle</GameButton>
                    }

                </div>

            }
        </div>
    );
}