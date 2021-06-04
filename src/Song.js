import React from 'react';
import { useState } from 'react';

export default function Song(props) {

const startSrc = "https://open.spotify.com/embed/track/"
const [song, setSong] = useState(null)
const [lyric, setLyrics] = useState(null)
const [link, setLink] = useState(null)


function getSpoti(){
    const searchWord = "q="+ props.item.track.artist_name +"%20"+props.item.track.track_name+"&type=track"
    var URL = proxy + 'https://api.spotify.com/v1/search?' // link of API
    URL += searchWord // adding track id to link
    var request = require('request');
    // client credentials 
    var client_id = 'b936ad39fb5d455d9feaf0d6e67b51cd'; // client id
    var client_secret = '145d66c67c274bfd867441f32a30354e'; //  secret
    // requests authorization
    var authOptions = {
      url: proxy + 'https://accounts.spotify.com/api/token',
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      form: {
        grant_type: 'client_credentials'
      },
      json: true
    };
    // request the song from spotify by id
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var token = body.access_token; 
        var options = {
          url: URL,
          headers: {
            'Authorization': 'Bearer ' + token 
          },
          json: true
        };
        request.get(options, function(error, response, body) {
          if( body.tracks.items[0] !== undefined){
            setLink(body.tracks.items[0].external_urls.spotify)
            setSong(startSrc + body.tracks.items[0].id) 
          }          
        });
      }
    });
  }

    const proxy = "https://cors-anywhere.herokuapp.com/";
    const axios = require('axios');
    const urlGetLyrics= "https://api.musixmatch.com/ws/1.1/track.lyrics.get?commontrack_id=" + props.item.track.commontrack_id + "&apikey=e9882bc5eb026434a2d1fadbecb10d5a";
    function DisplaySong(){        
            // GET request using axios inside useEffect React hook
            axios.get(proxy+urlGetLyrics)
                .then(function (response) {
                  var array = response.data.message.body.lyrics.lyrics_body.split("*******");
                  setLyrics(array[0])
                });
    }

    async function sendInfo() { //onclick sending nessesary info & calling on the modual
        // TODO do some asynchronous work
        // TODO and other when the asynchronous stuff is complete     
        await getSpoti();
        await DisplaySong(); 
        secondFunction();       
    }
    function secondFunction () {
      props.showSongModal(song, lyric, link, props.item.track.artist_name, props.item.track.track_name)
    }

    return ( // display song matches in a list, with an onclick to open the modal
        <div>
          <li className="d-flex border-bottom mb-3">
            <div>
            <button className="btn btn-success previewBtn me-3 mb-3" style={{width:200}}onClick={sendInfo} > Preview & Lyrics</button>
            </div>
              <p>{props.item.track.artist_name} - {props.item.track.track_name}</p>
          </li>
        </div>
    )
}
