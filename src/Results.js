import React, {useState, useEffect} from 'react';
import Song from './Song';
import axios from 'axios';
import Modal from 'react-modal';
import spinner from "./spinner.gif";
import PrevTrack from "./PrevTrack";

export default function Results(props) {
    const [songs, setSongs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentSong, setCurrentSong] = useState(false);
    const [currentLyrics, setCurrentLyrics] = useState(false);
    const [currentArtist, setCurrentArtist] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(false);
    const [loading, setLoading] = useState(false);
    const [localArray, setLocalArray] = useState(JSON.parse(localStorage.getItem("track")))
    const proxy = "https://cors-anywhere.herokuapp.com/";

    //const urlGetLyrics = "https://api.musixmatch.com/ws/1.1/track.lyrics.get?commontrack_id=11278&apikey=e9882bc5eb026434a2d1fadbecb10d5a";
    const urlSearchLyrics = "https://api.musixmatch.com/ws/1.1/track.search?q_lyrics="+ props.item + "&page_size=50&s_track_rating=desc&apikey=e9882bc5eb026434a2d1fadbecb10d5a";
    //const urlSearchTrack = "https://api.musixmatch.com/ws/1.1/track.search?q_artist=nirvana&page_size=3&page=1&s_track_rating=desc&apikey=e9882bc5eb026434a2d1fadbecb10d5a";
    const axios = require('axios');

    function showModalFunction(spotify, lyric, artist, track) {
        setCurrentSong(spotify);
        setCurrentLyrics(lyric);
        setCurrentArtist(artist);
        setCurrentTrack(track);
        if(spotify == null || lyric == null){
            //alert("Not available")
        } else {
            var save = JSON.parse(localStorage.getItem("track"))
            save.unshift(artist +" - "+ track)
            if (save.length > 3){
                save.pop()
            }
            localStorage.setItem("track", JSON.stringify(save))
            setLocalArray(save)
            setShowModal(true)
        }
    }

    function hideModal() {
        console.log("STÄNG MIG!")
        setShowModal(false);
    }
    
    useEffect(() => {
        if (props.item != undefined) {

        // GET request using axios inside useEffect React hook
        axios.get(proxy+urlSearchLyrics)
            .then(function (response) {
              console.log(response.data)
              setSongs(response.data.message.body.track_list)
              setLoading(true)
            }).catch(function (error) {
                console.log(error)
            });
        }
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, [urlSearchLyrics]);
        //console.log(songs);
        //console.log(songs.message.body.lyrics.lyrics_id);
        //console.log(songs.message.body.track_list[0].track.track_name)
        //{songs.map(song => <Song key={song.track.track_id} item={song} />) }
        console.log(currentSong);
        console.log(currentLyrics);  
    
        if (props.item != undefined){
            
            return (
                <div>
                    <p>Latest songs opened</p>
                    <ul className="d-flex">
                    {localArray.map(track => <PrevTrack item={track} />)}
                    </ul>
                   
                    <ul className="pt-4">
                    {loading ? songs.map(song => <Song key={song.track.track_id} item={song} showSongModal={showModalFunction} />)  : <img src={spinner}/> }
                    </ul>
                    {<Modal
                    isOpen={showModal}>
                    <div className="modal-content">

                    <div className="modal-header">
                    <h2 className="mt-3 text-white bg-success ps-1 pe-4 text-center" >{currentArtist} - {currentTrack}</h2>
                    <button onClick={hideModal} type="button" className="btn btn-secondary float-right">Close</button>
                    
                    </div>

                    <div className="modal-body">
                    <iframe src={currentSong} width="450" height="330" allowtransparency="true" allow="encrypted-media"> </iframe>
                    <p>{currentLyrics}</p>
                    </div>

                    <div className="modal-footer mb-3">
                    <a href="https://www.spotify.com/se/home/" > Visit spotify </a>
                    </div>

                    </div>
                    </Modal>}
                </div>
            )
        }

    return (
        <div>
            <p>Latest songs opened</p>
                    <ul className="d-flex">
                        {localArray.map(track => <PrevTrack item={track} />)}
                    </ul>
        </div>
    )
}
