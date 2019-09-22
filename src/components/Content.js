import React from 'react'

export default function Content(props) {
    if(props.page)
        return(
            <div className="contents">
                <p>
                    Hi! We are Chandana and Yuvashree and we are currently doing our MCA and 
                    this site is for you to help us out in our project that 
                    We are currently doing which is based on neural networks<br/> <br/> 
                    please do click on the project button below for more info
                </p>
            </div>
        )
    else
        return (
            <div className="contents">
                <p>
                My project is all about predicting your total marks ( final board exam marks ) 
                with just your liking of the subject this is done using neural network which is 
                an AI algorithm which trains itself when you give it data and after training 
                it will have the capacity to predict what will be marks for a specific liking.<br/><br/>
                This where you guys come into play were your data can help me predict with more
                accuracy. So if you feel like giving your data then please select the board of education
                </p>
            </div>
        )
        
}
