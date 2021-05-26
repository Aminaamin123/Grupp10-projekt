import React, { useState, useEffect } from 'react';


export default function Spotify() {
    const [song, setSong] = useState(null)

    useEffect(() => {
        const track = "6rqhFgbbKwnb9MLmUQDhG6" // (should be the id from Song-component) 
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [URL])

    if(song){
      var trackLink ="https://open.spotify.com/embed/track/"
      trackLink += "6rqhFgbbKwnb9MLmUQDhG6"
      var albumLink ="https://open.spotify.com/embed/album/"
      albumLink += "3a0UOgDWw2pTajw85QPMiz"
        return (
            <div>
                <h1 className="mt-3 text-white bg-success">Spotify</h1>
                
                <div className="container">
                <div class="d-flex flex-wrap">
                  <div class="order-3 p-2">
                    <div className="card mb-4 rounded-4 box-shadow" style={{ width: '30rem' }}>
                        <div className="card-header">
                          Preview of track
                        </div> 
                        <div className="card-body">
                          <h4> {song.name}</h4>
                          <iframe src={trackLink} width="450" height="330" allowtransparency="true" allow="encrypted-media"> </iframe>
                          <form method="get" action="#" target="blank">
                          <button type="submit" className="btn btn-success">Take me to track</button>
                          </form>
                        </div>
                      </div>
                      </div>
                  <div class="order-2 p-2">
                  <div className="card mb-4 box-shadow" style={{ width: '30rem' }}>
                        <div className="card-header">
                          Preview of album
                        </div> 
                        <div className="card-body">
                        <h4> Album name </h4>
                          <iframe src={albumLink} width="450" height="330" allowtransparency="true" allow="encrypted-media"></iframe>
                          <form method="get" action={song.album.external_urls.spotify} target="blank">
                          <button type="submit" className="btn btn-success">Take me to album</button>
                          </form>
                        </div>
                      </div>
                  </div>
                </div>
                </div>
            </div>
        )
    }
    return(
        <div>
            Spotify - did not find song
        </div>
    )
}