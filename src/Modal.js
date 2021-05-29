import React from 'react'
import Spotify from './Spotify'

export default function Modal(props) {

    return (
        <div>

            <div className="modal fade" id="myModal">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
            <div className="modal-header">
              <h3>Previews</h3>
            </div>
            <div className="modal-body">
                <Spotify/>
            </div>
            <div className="modal-footer mb-3">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
          </div>
        </div>
        <a href="#" data-bs-toggle="modal" data-bs-target="#myModal" type="button" class="btn btn-dark"> Open Modal</a>
            
        </div>
    )
}
