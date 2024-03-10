export function sortPlayers(array) {

    let sortedArray = array.sort(
        function (a, b) {
            if (a.card.speed === b.card.speed) {
                // console.warn('two speeds match');
                // Price is only important when cities are the same
                if (b.card.level === a.card.level) {
                    // console.warn('two levels match');
                    if (a.card.weaponskill === b.card.weaponskill) {
                        // console.warn('two weapon skills match');
                        return Math.random();
                    }
                    return b.card.weaponskill - a.card.weaponskill;
                }
                return b.card.level - a.card.level;
            }
            //  console.warn(a.speed < b.speed ? 1 : -1);
            return a.card.speed < b.card.speed ? 1 : -1;
        }
    );
    return sortedArray;
}

export function handleDeath(turnOrder) {
    let opponentsDeceased = turnOrder.filter((member) => member.card.healthpoints <= 0)
    return opponentsDeceased;
}

export function removeMatchingPlayer(array, player) {
    let remaining = array.filter(member => member.card.id !== player.card.id)
    return remaining;
}

export function applyModifier(metric, modifier, player) {
    // console.warn(metric, modifier, player);
    // return player.card[metric] * modifier;
    let selectedModifier = player.card[metric]
    console.warn('selectedModifier * modifier', selectedModifier, modifier);
    return selectedModifier = selectedModifier * modifier;
}

export function reverseModifier(metric, modifier, player) {
    // console.warn(metric, modifier, player);
    // return player.card[metric] * modifier;
    let selectedModifier = player.card[metric]
    console.warn('selectedModifier * modifier', selectedModifier, modifier);
    return selectedModifier = selectedModifier / modifier;
}

export function calculateDamage(attackNumber, attacker, defender) {
    let damageDealt = Math.round(((attacker.card.weaponskill * attacker.card.strength) * (attacker.card.strength / defender.card.toughness)) / 2)
    console.warn(attacker.card.creature, 'dealt', damageDealt, 'damage to', defender.card.creature, 'on', attackNumber, 'attack');
    let newHealth = defender.card.healthpoints - damageDealt;
    defender.card.healthpoints = newHealth;
    return newHealth;
}

export function parryOrConnect(attackNumber, attacker, defender) {
    let parryChance = 2 * (defender.card.speed * defender.card.weaponskill * defender.card.toughness) / (attacker.card.speed * attacker.card.weaponskill * attacker.card.strength)
    console.warn(defender.card.creature, 'has', parryChance, '% chance of parry on ', attackNumber, 'attack');
    var random = Math.random() * 100;
    if (random > 0 && random < parryChance) {
        return true; // parried
    } else if (random >= parryChance && random < 100) {
        return false; // parry failed
    }
}

export function hitOrMiss(attackNumber, attacker, defender) {
    let missChance = 1 * ((defender.card.speed * defender.card.weaponskill) / (attacker.card.speed * attacker.card.weaponskill))
    console.warn(attacker.card.creature, 'has', missChance, '% chance of miss on attack number ', attackNumber);
    // Dependant on their chances, run hit or miss:
    var random = Math.random() * 100;
    if (random > 0 && random < missChance) {
        return false; // attempt missed
    } else if (random >= missChance && random < 100) {
        return true; // attempt successful
    }
}


// export function 