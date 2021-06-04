import React from 'react'
import PrevTrack from './PrevTrack'
import view from './lastViewed.png'
 
export default function Previous(props) {
const widthImg = "200px"

    if (props.item != null){ //controls that there is a previous song
        //list of all previously recorded songs
        return (

            <div class="container">
            <div class=" mx-auto">
               <img className="img-fluid" style={{width: widthImg}} src={view}/>
            </div>
            <div class="row">
                {props.item.map(track => <PrevTrack item={track} />)}
            </div>
            </div>
        )
    }
    return (
        <div>
        </div>
    )

}
