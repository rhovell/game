import React from 'react';
import { useState, useEffect } from 'react';

export default function SelectCardScreen({ deckList }) {
    // console.warn(player);
    const [deck, setDeck] = useState('')

    useEffect(() => {
        setDeck(deckList)
        let deckItems = deckList.map((card) =>
        <li key={card.creature}>{card}</li>
        );
        return (
            <div className='select-card-screen'>
                <ul>
                    {deckItems}
                </ul>
            </div>
        );
    }, [deckList, setDeck]);


  




}