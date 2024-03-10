# States and data points

## App.js

### Incoming data
- player_Data from player.json = player state
- opponent_Data from opponent.json = opponent state
- attackList from attack_sheet.json = attacks state

### Lists needed

All available characters for player = player.cardList
All creatures for opponent = opponent.cardList

All selected players = allPlayers
Selected characters for player = playerTeam
Selected creatures for opponent = opponentTeam

### Booleons

isLoading

### Strings

gameState
battleState
message
winner


## BattleScreen.js

### Booleons

isAttacking
automated

### Lists needed

turnOrder
attacker
defender

### Numbers

turn
round



damage modifiers run at start of attack before chance of miss

combatant modifier run after the total damage has been dealt 