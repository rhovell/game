import React from 'react';
import { useState, useEffect } from 'react';
import './styles/deck.css'

export default function SelectCardScreen({ deckList, selectCard }) {
    // console.warn(deckList);
    const [deck, setDeck] = useState(deckList)

   
        // setDeck(deckList)
        let deckItems = deckList.map((card) =>
            <li key={card.creature} className='card' id={card.creature} onClick={(event) => selectCard(event)}>
                {card.creature}
            </li>
        );
        return (
            <div className='select-card-screen'>
                <div className='deck'>
                    <ul className='card-list'>
                        {deckItems}
                    </ul>

                </div>
            </div>
        );

}