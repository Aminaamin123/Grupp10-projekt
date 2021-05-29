import React from 'react';
import Spotify from './Spotify';
import Song from './Song';

import {useState, useEffect} from 'react';
import axios from 'axios';

export default function Results(props) {
    console.log(props.item)
    //const songs = []
    const [songs, setSongs] = useState([]);
    const proxy = "https://cors-anywhere.herokuapp.com/";

    const searchWord = "looking california but feeling minnesota";

    const urlGetLyrics = "https://api.musixmatch.com/ws/1.1/track.lyrics.get?commontrack_id=11278&apikey=e9882bc5eb026434a2d1fadbecb10d5a";
    const urlSearchLyrics = "https://api.musixmatch.com/ws/1.1/track.search?q_lyrics="+ props.item + "&page_size=50&s_track_rating=desc&apikey=e9882bc5eb026434a2d1fadbecb10d5a";
    const urlSearchTrack = "https://api.musixmatch.com/ws/1.1/track.search?q_artist=nirvana&page_size=3&page=1&s_track_rating=desc&apikey=e9882bc5eb026434a2d1fadbecb10d5a";
    const axios = require('axios');

    useEffect(() => {
        // GET request using axios inside useEffect React hook
        axios.get(proxy+urlSearchLyrics)
            .then(function (response) {
              console.log(response.data)
              setSongs(response.data.message.body.track_list)
              setSongs(songs.filter((item) => item.track.track_rating > 5));
            });
    
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, [urlSearchLyrics]);
        //console.log(songs);
        //console.log(songs.message.body.lyrics.lyrics_id);
        //console.log(songs.message.body.track_list[0].track.track_name)
        //{songs.map(song => <Song key={song.track.track_id} item={song} />) }
           

    if (songs.length > 1){
        return (
            //TODO API request to match song, Show resultat of all matching songs
            <div>
                
                If only one song: display on spotify else: list + click function
                <ul>
                {songs.map(song => <Song key={song.track.track_id} item={song} />) }
                </ul>
            </div>
        )
    }
    return (
        <div>
        </div>
    )
}
