import React, { useRef, useState } from 'react';
import Results from './Results';

export default function Search() {
    const [lyric, setSong] = useState(null)
    const inputLyric = useRef(); 

    // retriving the input
    function setLyric(event){ 
       event.preventDefault();
       setSong(inputLyric.current.value)
       inputLyric.current.value = "";
    }

    //search form to retrive input from user - sent input to result component
    return (
        <div className="mx-auto">
            <form className="p-2 w-50 mx-auto">
                <fieldset>
                    <input className="form-control" type="text" id="lyric" placeholder="Enter your lyric..." ref={inputLyric} />
                    <input type="submit" className="btn btn-success mt-3" value="Search" onClick={setLyric} />
                </fieldset>
            </form>
            <Results item={lyric} />
        </div>
    )
}
