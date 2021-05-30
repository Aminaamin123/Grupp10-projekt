import React from 'react'
import Spotify from './Spotify'

export default function Modal(props) {
var load = false

    return (
        <div>

        <div className="modal fade" id="myModal">
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
            <div className="modal-header">
            <h1 className="mt-3 text-white bg-success ps-1 pe-4">Spotify</h1>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
            <div className="modal-body">
                <Spotify item={props.item} key={load}/>
            </div>
            <div className="modal-footer mb-3">
            <a href="https://www.spotify.com/se/home/" > Visit spotify </a>
            </div>
          </div>
          </div>
        </div>

        <a href="#" isOpen={load=true} data-bs-toggle="modal" data-bs-target="#myModal" type="button" className="btn btn-dark " id="openModal"> Preview on spotify </a>
            
        </div>
    )
}