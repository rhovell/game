# Game Flow

First attacker decision runs when playerCard/opponentCard props are loaded - attacker is decided by who is fastest - this decides the UI 

## Standard Attack

Run turn is triggered on click - with optional auto setting
`runTurn()`

`Turn count +1`

If two turns have passed - Attacker is decided by who is fastest, otherwise the attacker remains the same.

Calculate the chance that the attacker will miss their attack
    `calculateMiss()`

Dependant on their chances, run hit or miss:
    `hit()` or `miss()`

If the attack landed, then calculate the chance of the defender parrying the attack:
    `calculateParry()` 

    Dependant on the defender's chance of parrying, run parried or connected:
`parried()` or `connected()`

    If the defender parried the first attack, the attacker has another chance of attacking.

    If the defender failed to parry and the attacker connects, then calculate damage:
`calculateDamage()`

    The attacker then has another chance of attacking.

If the first attack missed (or is parried), the attacker has another chance of attacking.
`tryAgain()`

The attackers second attack runs through the above journey again, but if parried, the round is over.

The players then switch attacker and defender, dependant on who went last.
`switchPlayer()`


If either player's health reaches 0 or below, the game ends:
    `endGame()`




