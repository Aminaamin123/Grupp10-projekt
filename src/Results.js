import React from 'react';
import Spotify from './Spotify';
import Song from './Song';

export default function Results() {
    return (
        <div>
            Show resultat of all matching songs
            If only one song: display on spotify else: list + click function
            <ul>
                All matches <Song/> 
            </ul>
            <Spotify/> 

        </div>
    )
}
