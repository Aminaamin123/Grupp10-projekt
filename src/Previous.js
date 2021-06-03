import React from 'react'
import PrevTrack from './PrevTrack'

export default function Previous(props) {


    if (props.item != null){ //controls that there is a previous song
        //list of all previously recorded songs
        return (
            <div className="mt-4">
                <h5>Latest viewed songs</h5>
                <ul className="d-flex center mx-auto text-center">
                {props.item.map(track => <PrevTrack item={track} />)}
                </ul>
            </div>
        )
    }
    return (
        <div>
        </div>
    )

}
