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
    const [loading, setLoading] = useState(false);
    const [localArray, setLocalArray] = useState(JSON.parse(localStorage.getItem("track")))
    const proxy = "https://cors-anywhere.herokuapp.com/";

    //set api link with the search props retrived in search component
    const urlSearchLyrics = "https://api.musixmatch.com/ws/1.1/track.search?q_lyrics="+ props.item + "&page_size=50&s_track_rating=desc&apikey=993d848b2aa65108fbbb47bdb115fe6c";
    const axios = require('axios');

    function showModalFunction(spotify, lyric, artist, track) {
        //retriving and saving data to use in modal
        setCurrentSong(spotify);
        setCurrentLyrics(lyric);
        setCurrentArtist(artist);
        setCurrentTrack(track);
        if(spotify == null || lyric == null){ //when the song does not exist on spotify or have lyric, show alert
            //TODO - (when button works!) alert("Not available") 
        } else { // set pervious song array and open modal
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
            setShowModal(true)
        }
    }

    function hideModal() {
        setShowModal(false);
    }
    
    useEffect(() => { //TODO - how can we run without the function running in the beginning?
        setLoading(true)
        if (props.item !== undefined) {
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

        if (props.item !== undefined || props.item !== null){ //while there is a search
            return (
                <div>
                    <Previous item={localArray} /> {/* TODO - text responsive */}
                    <ul className="pt-4">
                    {loading ? songs.map(song => <Song key={song.track.track_id} item={song} showSongModal={showModalFunction} />)  : <img src={spinner} alt="spinner"/> }
                    </ul>
                    {/* TODO - modal responsive */}
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
                            <a href={currentSong} className="btn btn-success" > Visit spotify </a>
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
