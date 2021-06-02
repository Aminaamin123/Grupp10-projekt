import React, {useState, useEffect} from 'react';
import Song from './Song';
import axios from 'axios';
import Modal from 'react-modal';
import spinner from "./spinner.gif";

export default function Results(props) {
    const [songs, setSongs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentSong, setCurrentSong] = useState(false);
    const [currentLyrics, setCurrentLyrics] = useState(false);
    const [loading, setLoading] = useState(false);
    const proxy = "https://cors-anywhere.herokuapp.com/";

    //const urlGetLyrics = "https://api.musixmatch.com/ws/1.1/track.lyrics.get?commontrack_id=11278&apikey=e9882bc5eb026434a2d1fadbecb10d5a";
    const urlSearchLyrics = "https://api.musixmatch.com/ws/1.1/track.search?q_lyrics="+ props.item + "&page_size=50&s_track_rating=desc&apikey=e9882bc5eb026434a2d1fadbecb10d5a";
    //const urlSearchTrack = "https://api.musixmatch.com/ws/1.1/track.search?q_artist=nirvana&page_size=3&page=1&s_track_rating=desc&apikey=e9882bc5eb026434a2d1fadbecb10d5a";
    const axios = require('axios');

    function showModalFunction(spotify, lyric) {
        setCurrentSong(spotify);
        setCurrentLyrics(lyric);
        if(spotify == null || lyric == null){
        } else {
            setShowModal(true)
        }
    }

    function hideModal() {
        console.log("STÄNG MIG!")
        setShowModal(false);
    }

    useEffect(() => {
        // GET request using axios inside useEffect React hook
        axios.get(proxy+urlSearchLyrics)
            .then(function (response) {
              console.log(response.data)
              setSongs(response.data.message.body.track_list)
              setLoading(true)
            });
    
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
                    <ul>
                    {loading ? songs.map(song => <Song key={song.track.track_id} item={song} showSongModal={showModalFunction} />)  : <img src={spinner}/> }
                    </ul>
                    {<Modal
                    isOpen={showModal}>
                    <h2 onClick={hideModal}>Test</h2>
                    <a>{currentLyrics}</a>
                    <iframe src={currentSong} width="450" height="330" allowtransparency="true" allow="encrypted-media"> </iframe>
                    </Modal>}
                </div>
            )
        }

    return (
        <div>
            
        </div>
    )
}
