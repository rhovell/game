import React from 'react';
import './styles/deck.css'
import SelectCharacter from './SelectCharacter'

export default function SelectCardScreen({ 
    deckList, 
    selectTeamMember, 
    children 
}) {


        return (
            <div className='select-card-screen'>
                <div className='deck'>
                    <ul className='card-list'>
                        {deckList.map((card, i) =>
                            <SelectCharacter 
                            selectTeamMember={selectTeamMember} 
                            card={card} 
                            key={`${i}_${card.creature}`}></SelectCharacter>
                        )}
                        {children}
                    </ul>
                </div>
                
            </div>
        );

}