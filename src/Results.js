import React from 'react';
import Spotify from './Spotify';
import Song from './Song';

export default function Results(props) {
    console.log(props.item)
    return (
        //TODO API request to match song, Show resultat of all matching songs
        <div>
           
            If only one song: display on spotify else: list + click function
            <ul>
                All matches <Song/> 
            </ul>
            <Spotify/> 

        </div>
    )
}
