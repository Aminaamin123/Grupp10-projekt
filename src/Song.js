import { div } from 'prelude-ls';
import React from 'react'
import {useState, useEffect} from 'react';
import Modal from 'react-modal';

export default function Song(props) {

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
        setIsOpen(true);
      }
    
      function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
      }
    
      function closeModal(){
        setIsOpen(false);
      }


    const [info, setInfo] = useState([]);

    const proxy = "https://cors-anywhere.herokuapp.com/";
    const axios = require('axios');
    const urlGetLyrics= "https://api.musixmatch.com/ws/1.1/track.lyrics.get?commontrack_id=" + props.item.track.commontrack_id + "&apikey=e9882bc5eb026434a2d1fadbecb10d5a";

    function DisplaySong(){        
        
            // GET request using axios inside useEffect React hook
            axios.get(proxy+urlGetLyrics)
                .then(function (response) {
                  console.log(response.data)
                  alert(response.data.message.body.lyrics.lyrics_body)
                });
    }
    return (

        <div>
        <li>
            
        
      <div>
        <button className="btn btn-success me-3 mb-3" onClick={openModal}>Preview on Spotify</button>
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
          SPOTIFY COMPONENT...
        </Modal>
      </div>
    

            
            <button className="btn btn-success me-3 mb-3" onClick={() => DisplaySong()}> Get full lyric </button>
            {props.item.track.artist_name} -
            {props.item.track.track_name}
        </li>
        </div>

    )
}









