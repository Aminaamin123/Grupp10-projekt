import React from 'react'

export default function Song(props) {
    return (
        <li>
            {props.item.track.artist_name} -
            {props.item.track.track_name}
        </li>
    )
}
