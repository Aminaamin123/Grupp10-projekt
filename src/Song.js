import React from 'react';
//import Modal from './Modal';
import Modal from 'react-modal';
import { useState, useEffect } from 'react';

export default function Song(props) {

const startSrc = "https://open.spotify.com/embed/track/"
const startIframe = "<iframe src="
const endIframe = ' width="450" height="330" allowtransparency="true" allow="encrypted-media"> </iframe>'
const [song, setSong] = useState(null)
const [lyric, setLyrics] = useState(null)


const trackId = "https://open.spotify.com/embed/track/6rqhFgbbKwnb9MLmUQDhG6";
//const proxy = "https://cors-anywhere.herokuapp.com/";
//<iframe src={song} width="450" height="330" allowtransparency="true" allow="encrypted-media"> </iframe>

function getSpoti(){
    const track = "6rqhFgbbKwnb9MLmUQDhG6" // (should be the id from Song-component) 
    const track1 = "3PeDt4Q8YIFDRph5UhxAaA"
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
          console.log(body); // REMOVE, test printing
          setSong(startSrc + body.tracks.items[0].id)           
               
        });
      }
    });
    
  }

    const customStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)'
        }
      };
    
      var subtitle;
      const [modalIsOpen,setIsOpen] = React.useState(false);
      function openModal() {
        getSpoti();
        setIsOpen(true);
      }
    
      function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
      }
    
      function closeModal(){
        setIsOpen(false);
      }

    const proxy = "https://cors-anywhere.herokuapp.com/";
    const axios = require('axios');
    const urlGetLyrics= "https://api.musixmatch.com/ws/1.1/track.lyrics.get?commontrack_id=" + props.item.track.commontrack_id + "&apikey=e9882bc5eb026434a2d1fadbecb10d5a";
    function DisplaySong(){        
            // GET request using axios inside useEffect React hook
            axios.get(proxy+urlGetLyrics)
                .then(function (response) {
                  console.log(response.data)
                  setLyrics(response.data.message.body.lyrics.lyrics_body)
                  
                  //alert(response.data.message.body.lyrics.lyrics_body)
                  //return (response.data.message.body.lyrics.lyrics_body);
                });
    }

    function sendInfo() {
        getSpoti();
        DisplaySong();        
        props.showSongModal(song, lyric)
        
    }

    function firstFunction(){
        // do some asynchronous work
        // and when the asynchronous stuff is complete            
        getSpoti();
        DisplaySong(); 
    }

    function secondFunction () {
        getSpoti()
                .then(function () {
                  
                  props.showSongModal(song, lyric);
                  
                  //alert(response.data.message.body.lyrics.lyrics_body)
                  //return (response.data.message.body.lyrics.lyrics_body);
                });
    }
    

    return (

        <div>
        <li className="d-flex">
                                
        
      <div>
        <button className="btn btn-success me-3 mb-3" onClick={sendInfo} >Preview on Spotify & Lyric</button>

      </div>
    
            {props.item.track.artist_name} -
            {props.item.track.track_name}
        </li>
        </div>

        

    )/*
    <Modal
    isOpen={modalIsOpen}
    onAfterOpen={afterOpenModal}
    onRequestClose={closeModal}
    style={customStyles}
    contentLabel="Example Modal"
  >

    <h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2>
    <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
    <h1 className="mt-3 text-white bg-success ps-1 pe-4">Spotify</h1>
    <iframe src={song} width="450" height="330" allowtransparency="true" allow="encrypted-media"> </iframe>
  </Modal>*/
}
