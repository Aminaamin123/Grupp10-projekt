import React, { useRef, useState } from 'react';
import Results from './Results';

export default function Search() {
    const [lyric, setSong] = useState(null)

    const inputLyric = useRef();

    function setLyric(event){
       event.preventDefault();
       setSong(inputLyric.current.value)
       inputLyric.current.value = "";
    }

    return (
        <div>
            <form className="border border-success p-2 w-50">
                <fieldset>
                    <label htmlfor="lyric">Search after a song:</label>
                    <input className="form-control" type="text" id="lyric" placeholder="Enter your lyric..." ref={inputLyric} />
                    <input type="submit" className="btn btn-success mt-3" value="Search" onClick={setLyric} />
                </fieldset>
            </form>
            <Results item={lyric}/>
        </div>
    )
}
