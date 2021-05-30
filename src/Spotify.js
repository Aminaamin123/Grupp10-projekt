import React, { useState, useEffect } from 'react';


export default function Spotify(props) {
    const [song, setSong] = useState(null)
    const trackId = "https://open.spotify.com/embed/track/6rqhFgbbKwnb9MLmUQDhG6";

        const track = "6rqhFgbbKwnb9MLmUQDhG6" // (should be the id from Song-component) 
        const track1 = "3PeDt4Q8YIFDRph5UhxAaA"
        var URL = 'https://api.spotify.com/v1/tracks/' // link of API
        URL += track // adding track id to link
        var request = require('request');
        // client credentials 
        var client_id = 'b936ad39fb5d455d9feaf0d6e67b51cd'; // client id
        var client_secret = '145d66c67c274bfd867441f32a30354e'; //  secret
        // requests authorization
        var authOptions = {
          url: 'https://accounts.spotify.com/api/token',
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
              setSong(body)
            });
          }
        });
  

    return(
        <div>
           Spotify - did not find song
        </div>
    )
}