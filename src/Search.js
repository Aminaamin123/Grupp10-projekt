import React from 'react';
import Results from './Results';

export default function Search() {

    // TODO get a string to send to Resultas
    const search = "lyric"
    return (
        <div>
            Search:.... 
            Get resultat songs by using lyric as input
            <Results item={search}/>
        </div>
    )
}
