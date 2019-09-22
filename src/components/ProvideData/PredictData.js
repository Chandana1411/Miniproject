import React, { Component } from 'react'
import SweetAlert from 'react-bootstrap-sweetalert'
import "./form.css"

export default class PredictData extends Component {
    constructor(props){
        super(props)
        this.state={
            language : "" ,
            english : "",
            maths : "",
            physics : "",
            chemistry : "",
            other : "",
            success : false,
            error : false,
            result : "",
        }
        this.range = [
            "below 500", 
            "between 500 to 600", 
            "between 600 to 700", 
            "between 700 to 800",
            "between 800 to 900",
            "between 900 to 1000",
            "between 1000 to 1100",
            "between 1100 to 1200",
        ]
    }

    handlersLanguage = (event) =>{
        this.setState({
            language : event.target.value 
        })
    }
    handlersEnglish = (event) =>{
        this.setState({
            english : event.target.value 
        })
    }

    handlersMaths = (event) =>{
        this.setState({
            maths : event.target.value 
        })
    }

    handlersPhysics = (event) =>{
        this.setState({
            physics : event.target.value 
        })
    }

    handlersChemistry = (event) =>{
        this.setState({
            chemistry : event.target.value 
        })
    }

    handlersOther = (event) =>{
        this.setState({
            other : event.target.value 
        })
    }

    predict = (e) =>{
        e.preventDefault();
        let arr = [];
        for (let key in this.state){
            console.log(typeof key)
            if(!(key === "success"|| key === "error" || key === 'result'))
                arr.push((parseInt(this.state[key],10))/10)
        }
        this.props.AI.postMessage(arr)
        this.props.AI.onmessage = (e) =>{
            if(e.data){
                this.setState({
                    result : this.range[e.data],
                    success : true
                })
                console.log(this.range[e.data])
            }
            else
                this.setState({
                    error : true
                })
        }
    }

    onConfirm = () =>{
        this.setState({
            error : false,
            success : false,
        })
    }

    render() {
        return (
            <div id="contact">
                <h3>Project Form</h3>
                <h4>
                    Rules to fill the form<br/>
                    <br/>please do rank the subjects from 6 to 1 and the ranking should not repeat. Where your most favourite subject is given a '6' and least favourite is given a '1'.
                    <br/>For example ENGLISH = 1 , MATHS = 2 , PHYSICS = 3 , CHEMISTRY = 4 , COMPUTER/BIO = 5 , 2ND LANGUAGE = 6 here your most favourite subject is 2nd language and least is English.
                </h4>
                <form action="">
                    <div className="inputs">
                        <input placeholder="2ND LANGUAGE" type="number" value={this.state.language} onChange={this.handlersLanguage} min="1" max="9"/>
                        <input placeholder="ENGLISH" type="number" value={this.state.english} onChange={this.handlersEnglish} min="1" max="9"/>
                        <input placeholder="MATHS" type="number" value={this.state.maths} onChange={this.handlersMaths} min="1" max="9"/>
                        <input placeholder="PHYSICS" type="number" value={this.state.physics} onChange={this.handlersPhysics} min="1" max="9"/>
                        <input placeholder="CHEMISTRY" type="number" value={this.state.chemistry} onChange={this.handlersChemistry} min="1" max="9"/>
                        <input placeholder="COMPUTER/BIO" type="number" value={this.state.other} onChange={this.handlersOther} min="1" max="9"/>
                    </div>
                    <div className="formButton">  
                        <button name="submit" type="submit" onClick={this.predict}>Submit</button>
                        <button name="submit" type="formButton" onClick={this.props.predictdata}>Back</button>
                    </div>
                </form>
                {this.state.success ?
                <SweetAlert info title={"Your marks will be " + this.state.result} onConfirm={this.onConfirm}>
                    Predicted Successfull
                </SweetAlert> : this.state.error ? 
                <SweetAlert danger title="Error" onConfirm={this.onConfirm}>
                    Error on prediction
                </SweetAlert> : null
                }
            </div>
        )
    }
}
