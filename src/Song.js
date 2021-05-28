import React from 'react'
import {useState, useEffect} from 'react';

export default function Song(props) {
    const [info, setInfo] = useState([]);

    const proxy = "https://cors-anywhere.herokuapp.com/";
    const axios = require('axios');
    const urlGetLyrics= "https://api.musixmatch.com/ws/1.1/track.lyrics.get?commontrack_id=" + props.item.track.commontrack_id + "&apikey=e9882bc5eb026434a2d1fadbecb10d5a";

    function DisplaySong(){        
        
            // GET request using axios inside useEffect React hook
            axios.get(proxy+urlGetLyrics)
                .then(function (response) {
                  console.log(response.data)
                  alert(response.data.message.body.lyrics.lyrics_body)
                  
                });
                
    }
    return (
        <li>
            {props.item.track.artist_name} -
            {props.item.track.track_name}
            <p onClick={() => DisplaySong()}>X</p>
        </li>
    )
}
