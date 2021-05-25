import React, { useRef } from 'react';
import Results from './Results';

export default function Search() {
    const lyric = ""

    const inputLyric = useRef();

    function setLyric(){
       lyric = inputLyric.current.value
    }
    // TODO get a string to send to Resultas

    return (
        <div>
            <from>
                <fieldset>
                    <div className="mb-3">
                        <label htmlfor="lyric">Search for after a song:</label>
                        <input className="form-control" type="text" id="lyric" placeholder="Enter your lyric..." ref={inputLyric} />
                    </div>
                    <input type="submit" className="btn btn-success mt-3" value="Search" onClick={setLyric} />
                </fieldset>
            </from>
            <Results item={lyric}/>
        </div>
    )
}
