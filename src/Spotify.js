import React, { useState, useEffect, ReactNode } from 'react';
import axios from 'axios';


export default function Spotify() {
    // Client Credentials 
    const accessToken = ""
    const tokenURL = "https://accounts.spotify.com/api/token"
    // Client Values
    const clientId = "b936ad39fb5d455d9feaf0d6e67b51cd"
    const clientSecret = "145d66c67c274bfd867441f32a30354e"
    const grantType = "client_credentials"
    const headers = {"Authorization": "Basic " + clientId + ":" + clientSecret}
    const data = {"grant_type": "client_credentials"}

    function authorize(){
        console.log("hello")
        axios.get(tokenURL).then(response =>{
            console.log(response.data)
        }, [tokenURL])
    }
    authorize()

    // test url
    const url = "http://www.omdbapi.com/?apikey=7c75e03b&i=tt1285016"
    const [song, setSong] = useState(null)

    useEffect(() => {
        axios.get(url).then(response =>{
            setSong(response.data)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url])

    if(song){
        return (
            <div>
                Spotify {song.Title}
            </div>
        )
    }
    return(
        <div>
            
        </div>
    )
}
