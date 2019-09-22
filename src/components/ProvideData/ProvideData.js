import React from 'react'
import SweetAlert from 'react-bootstrap-sweetalert'

export default class ProvideData extends React.Component {
    constructor(props){
        super(props)
        this.state={
            language : "" ,
            english : "",
            maths : "",
            physics : "",
            chemistry : "",
            other : "",
            total : "",
            success : false,
            error : false,
        }
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

    handlersTotal = (event) =>{
        this.setState({
            total : event.target.value 
        })
    }


    submit = (event) => {
        event.preventDefault();
        fetch("https://miniproject-ef989.firebaseio.com/TestData.json",{
            method : "POST",
            headers : {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
            },
            body : JSON.stringify({
                language : this.state.language ,
                english : this.state.english,
                maths : this.state.maths,
                physics : this.state.physics,
                chemistry : this.state.chemistry,
                other : this.state.other,
                total : this.state.total
            })
        }).then(res => {
           if(res.ok)
            this.setState({
                success : true
            })
        }).catch(err => {
            console.log(err);
            this.setState({
                error : true
            })
        })
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
                    Kindly fill up the form with proper details and also give your total that is your final exams marks out of 1200 as accurate as possible.<br />
                    Also please do rank the subjects from 6 to 1 and the ranking should not repeat. Where your most favourite subject is given a '6' and least favourite is given a '1'.<br />
                    For example ENGLISH = 1 , MATHS = 2 , PHYSICS = 3 , CHEMISTRY = 4 , COMPUTER/BIO = 5 , 2ND LANGUAGE = 6 , TOTAL = 1100 here your most favourite subject is 2nd language and least is English.<br />
                </h4>
                <form action="/">
                    <div className="inputs">
                        <input placeholder="2ND LANGUAGE" type="number" value={this.state.language} onChange={this.handlersLanguage} min="1" max="9"/>
                        <input placeholder="ENGLISH" type="number" value={this.state.english} onChange={this.handlersEnglish} min="1" max="9"/>
                        <input placeholder="MATHS" type="number" value={this.state.maths} onChange={this.handlersMaths} min="1" max="9"/>
                        <input placeholder="PHYSICS" type="number" value={this.state.physics} onChange={this.handlersPhysics} min="1" max="9" />
                        <input placeholder="CHEMISTRY" type="number" value={this.state.chemistry} onChange={this.handlersChemistry} min="1" max="9"/>
                        <input placeholder="COMPUTER/BIO" type="number" value={this.state.other} onChange={this.handlersOther} min="1" max="9"/>
                        <input placeholder="TOTAL" type="number" value={this.state.total} onChange={this.handlersTotal} min="1" max="9"/>  
                    </div>
                    <div className="formButton">  
                        <button name="submit" type="submit" onClick={this.submit}>Submit</button>
                        <button name="back" type="formButton" onClick={this.props.providerdata}>Back</button>
                    </div>
                </form>
                {this.state.success ?
                <SweetAlert success title="Success" onConfirm={this.onConfirm}>
                    Data was added Successfull thanks for your data
                </SweetAlert> : this.state.error ? 
                <SweetAlert danger title="Error" onConfirm={this.onConfirm}>
                    Data was not added
                </SweetAlert> : null
                }
            </div>
        )
    }
}
