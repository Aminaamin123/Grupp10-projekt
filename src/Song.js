import React from 'react';

export default function Song(props) {


    const urlGetLyrics= "https://api.musixmatch.com/ws/1.1/track.lyrics.get?commontrack_id=" + props.item.track.commontrack_id + "&apikey=e9882bc5eb026434a2d1fadbecb10d5a";


    async function sendInfo() { //onclick sending nessesary info & calling on the modual                
        props.showSongModal(urlGetLyrics, props.item.track.artist_name, props.item.track.track_name);
    }

    return ( // display song matches in a list, with an onclick to open the modal
          <li className="d-flex border-bottom mb-3">
            <div>
            <button className="btn btn-success previewBtn me-3 mb-3" style={{width:200}}onClick={sendInfo} > Preview & Lyrics</button>
            </div>
              <p>{props.item.track.artist_name} - {props.item.track.track_name}</p>
          </li>
    )
}
