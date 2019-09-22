import React from 'react'

export default function Heading(props) {
    if(props.page)
        return (
            <div className="heading">
                <h1>Hello World.</h1>
            </div>
        )
    else
        return(
            <div className="heading">
                <h1>Neural Networks</h1>
            </div>
        )
}
