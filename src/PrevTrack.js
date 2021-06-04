import React from 'react'

export default function PrevTrack(props) {
    var array = props.item.split("-");
    return (
        <div className="col me-3 list-unstyled border-bottom border-top border-dark pe-2 ps-2 pt-2 rounded-3">
           <p className=""> <span style={{fontWeight: "bold"}}> Artist:</span> {array[0]} - <span style={{fontWeight: "bold"}}> Track:</span> {array[1]}</p>
        </div>
    )
}
