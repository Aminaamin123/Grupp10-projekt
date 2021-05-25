import React from 'react';
import Spotify from './Spotify';
import Song from './Song';

import {useState, useEffect} from 'react';
import axios from 'axios';

export default function Results(props) {
    console.log(props.item)
    //const songs = []
    const [songs, setSongs] = useState([]);
    const proxy = "https://cors-anywhere.herokuapp.com/"
    const url = "https://api.musixmatch.com/ws/1.1/track.get?commontrack_id=11278&apikey=e9882bc5eb026434a2d1fadbecb10d5a"
    const axios = require('axios');

    useEffect(() => {
        // GET request using axios inside useEffect React hook
        axios.get(proxy+url)
            .then(function (response) {
              console.log(response.data)
              setSongs(response.data)
            });
    
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, [url]);
    
        console.log(songs);

    if (songs > 1){
        return (
            //TODO API request to match song, Show resultat of all matching songs
            <div>
               
                If only one song: display on spotify else: list + click function
                <ul>
                    All matches <Song/> 
                </ul>
    
            </div>
        )
    }
    return (
        <Spotify item={songs}/> 
    )
}
