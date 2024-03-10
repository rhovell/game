import React, { useCallback, useState } from 'react';

export default function SelectCharacter({ 
    card,
    selectTeamMember
 }) {

    const [disabled, setDisabled] = useState(false);

    const handleClick = useCallback((event, id) => {
        setDisabled(true)
        selectTeamMember(event, id)
    }, [setDisabled, selectTeamMember])

    return (
        <ul className='select-card-screen'>
            <li disabled={disabled} key={`${card.creature}`} className='card' creature={card.creature} onClick={(event) => handleClick(event, card.id)}>
                {card.creature}
                <br></br>
                Level: {card.level}
            </li>
        </ul>
    );

}