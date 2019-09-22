import React from 'react';
import './App.css';
import Heading from './components/Heading';
import Content from './components/Content';
import Buttons from './components/Buttons';
import ProvideData from './components/ProvideData/ProvideData';
import PredictData from './components/ProvideData/PredictData';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      clicked : true,
      providerdata : false,
      predictdata : false,
    }
    this.AI = null
    if (window.Worker) {
        this.AI = new Worker('./ai.js', {type : "module"});
        this.AI.onmessage = (e) =>{
            if(!JSON.parse(e.data))
              this.AI = null;
            else
              console.log("[App] data optained")
        }
    }
  }
  onClickHandlerClicked = () =>{
    this.setState(state => ({
       clicked : !state.clicked
    }))
  }

  onClickHandlerProvideData = () =>{
    this.setState(state => ({
      providerdata : !state.providerdata
    }))
  }


  onClickHandlerPredictData = () =>{
    this.setState(state => ({
      predictdata : !state.predictdata
    }))
  }

  render() {
    if(this.state.providerdata)
      return (
        <ProvideData providerdata={this.onClickHandlerProvideData}/>
      );

    if(this.state.predictdata)
      return (
        <PredictData predictdata={this.onClickHandlerPredictData} AI={this.AI}/>
      );

    if(!this.state.predictdata && !this.state.providerdata)
      return (
        <div className="main">
          <div className="img"></div>
          <div className="shadowwarapper">
            <div className="grid">
              <Heading page={this.state.clicked}/>
              <Content page={this.state.clicked}/>
              {this.state.clicked ? 
                <Buttons page={this.state.clicked} clicked={this.onClickHandlerClicked}/> : 
                <Buttons page={this.state.clicked}
                        clicked={this.onClickHandlerClicked} 
                        predictdata={this.onClickHandlerPredictData}
                        providerdata={this.onClickHandlerProvideData}
                />
              }
            </div>
          </div>
        </div>
      );
  }
}

export default App;
