import React from 'react'

export default function Buttons(props) {
    if(props.page)
        return(
            <div className="buttons">
                <button className="button" onClick={props.clicked}>Project</button>
            </div>
        )
    else
        return (
            <div className="buttons">
                <button className="button" onClick={props.providerdata}>Provide Data</button>
                <button className="button" onClick={props.predictdata}>Predict</button>
                <button className="button" onClick={props.clicked}>Back</button>
            </div>
        )
}
