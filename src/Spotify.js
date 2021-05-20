import React, { useState, useEffect } from 'react';


export default function Spotify() {
    const [song, setSong] = useState(null)

    useEffect(() => {
        var URL = 'https://api.spotify.com/v1/tracks/6rqhFgbbKwnb9MLmUQDhG6'
        var request = require('request');
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
              console.log(body);
              setSong(body)
            });
          }
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [URL])
     //"spotify:album:3a0UOgDWw2pTajw85QPMiz"
    if(song){
        return (
            <div>
                Spotify {song.external_urls.spotify} {song.track_number} {song.name} {song.uri} {song.album.id} 
                <iframe src="https://open.spotify.com/embed/album/3a0UOgDWw2pTajw85QPMiz" width="500" height="380" allowtransparency="true" allow="encrypted-media"></iframe>

                <iframe src="https://open.spotify.com/track/6rqhFgbbKwnb9MLmUQDhG6" width="500" height="380" allowtransparency="true" allow="encrypted-media"></iframe>
            </div>
        )
    }
    return(
        <div>
            Spotify did not find song
        </div>
    )
}
