import React from 'react'
import Spotify from './Spotify'
import { useState, useEffect } from 'react';

export default function Modal(props) {
var load = false

const startSrc = "https://open.spotify.com/embed/track/"
const startIframe = "<iframe src="
const endIframe = ' width="450" height="330" allowtransparency="true" allow="encrypted-media"> </iframe>'
const [song, setSong] = useState("https://open.spotify.com/embed/track/6rqhFgbbKwnb9MLmUQDhG6")

const trackId = "https://open.spotify.com/embed/track/6rqhFgbbKwnb9MLmUQDhG6";
const proxy = "https://cors-anywhere.herokuapp.com/";
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
          setSong(startIframe + startSrc + body.tracks.items[0].id + endIframe) 
          alert(startIframe + startSrc + body.tracks.items[0].id + endIframe);
               
        });
      }
    });
    
  }
    return (
        <div>

        <div className="modal fade" id="myModal">
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
            <div className="modal-header">
            <h1 className="mt-3 text-white bg-success ps-1 pe-4">Spotify</h1>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
            <div className="modal-body">
            <iframe src="https://open.spotify.com/embed/track/6rqhFgbbKwnb9MLmUQDhG6" width="450" height="330" allowtransparency="true" allow="encrypted-media"> </iframe>
            </div>
            <div className="modal-footer mb-3">
            <a href="https://www.spotify.com/se/home/" > Visit spotify </a>
            </div>
          </div>
          </div>
        </div>

        <a href="#" isOpen={load=true} data-bs-toggle="modal" data-bs-target="#myModal" type="button" className="btn btn-dark " id="openModal" onClick={getSpoti}> Preview on spotify </a>
            
        </div>
    )
}