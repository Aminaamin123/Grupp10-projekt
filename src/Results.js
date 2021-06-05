import React, {useState, useEffect} from 'react';
import Song from './Song';
import Modal from 'react-modal';
import spinner from "./spinner.gif";
import Previous from './Previous';

export default function Results(props) {
    const [songs, setSongs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentSong, setCurrentSong] = useState(false);
    const [currentLyrics, setCurrentLyrics] = useState(false);
    const [currentArtist, setCurrentArtist] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(false);
    const [currentLink, setCurrentLink] = useState(false);
    const [loading, setLoading] = useState(false);
    const [localArray, setLocalArray] = useState(JSON.parse(localStorage.getItem("track")))
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const startSpotifySrc = "https://open.spotify.com/embed/track/"

    //set api link with the search props retrived in search component
    var urlSearchLyrics
    if (props.item !== null){
        urlSearchLyrics = "https://api.musixmatch.com/ws/1.1/track.search?q_lyrics="+ props.item + "&page_size=50&s_track_rating=desc&apikey=e9882bc5eb026434a2d1fadbecb10d5a";
    }
    const axios = require('axios');

    function getSpotify(searchArtist, searchTrack){
        const searchWord = "q="+ searchArtist +"%20"+ searchTrack +"&type=track"
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
                setCurrentLink(body.tracks.items[0].external_urls.spotify)
                setCurrentSong(startSpotifySrc + body.tracks.items[0].id)  
                setShowModal(true)          
              } else {
                  setCurrentSong(startSpotifySrc);
                  setCurrentLink("https://open.spotify.com/")
                  setShowModal(true)
              }          
            });
          }
        });
      }

    function getLyrics(urlGetLyrics){        
        // GET request using axios inside useEffect React hook
        axios.get(proxy+urlGetLyrics)
            .then(function (response) {
              var array = response.data.message.body.lyrics.lyrics_body.split("*******");
              setCurrentLyrics(array[0])
              
            });
            
    }

    function showModalFunction(lyric, artist, track) {
        //retriving and saving data to use in modal
        getSpotify(artist, track)
        getLyrics(lyric)
        setCurrentArtist(artist);
        setCurrentTrack(track);
            var save = JSON.parse(localStorage.getItem("track"))
            if (save != null){
                save.unshift(artist +" - "+ track)
            }else{
                save = []
                save.push(artist +" - "+ track)
            }
            if (save.length > 3){
                save.pop()
            }
            localStorage.setItem("track", JSON.stringify(save))
            setLocalArray(save)
            //setShowModal(true)
        }
    

    function hideModal() {
        setShowModal(false);
    }
    
    useEffect(() => { 
        setLoading(true)
        if (props.item !== null) {
        // GET request using axios inside useEffect React hook
        axios.get(proxy+urlSearchLyrics)
            .then(function (response) {
              setSongs(response.data.message.body.track_list)
            }).catch(function (error) {
                console.log(error)
            });
        }
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, [urlSearchLyrics]); 

        if (props.item !== undefined || props.item !== null || props.item !== "null"){ //while there is a search
            return (
                <div>
                    <Previous item={localArray} />
                    <ul className="pt-4">
                    {loading ? songs.map(song => <Song key={song.track.track_id} item={song} showSongModal={showModalFunction} />)  : <img src={spinner} alt="spinner"/> }
                    </ul>
                    {<Modal  
                    isOpen={showModal}>
                    <div className="modal-content">
                        <div className="btn pull-right">
                            <button id="closebtn" onClick={hideModal} type="button" className="btn btn-secondary">Close</button>
                        </div>

                        <div className="modal-header">
                            <h2 className="mt-3 text-white bg-success ps-1 pe-4 mx-auto" >{currentArtist} - {currentTrack}</h2>                        </div>

                        <div className="modal-body">
                            
                            <div className="container text-center">
                                <iframe className="embed-responsive-item" id="iframeSpotify" src={currentSong} height="400" allowtransparency="true" allowfullscreen allow="encrypted-media"> </iframe>
                            </div>
                            <p>{currentLyrics}</p>
                        </div>

                        <div className="modal-footer mb-3">
                            <a href={currentLink} target="_blank" className="btn btn-success" > Visit spotify </a>
                        </div>
                    </div>
                    </Modal>}
                </div>
            )
        }

    return (
        <div>
            <Previous item={localArray} />
        </div>
    )
}
