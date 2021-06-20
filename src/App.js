//import Header from "./component/header"
import './App.css';
import React, {Component} from 'react';

class App extends Component{
  constructor()
  {
    super();
    this.state={
      data:'',
    }
  }
  handle(event)
  {
    this.setState({
      data:event.target.value
    })
  }
  render() {
    return (
      <div className="App">
        <input type="text" onCharge={ this.handle.bind(this)} />
        <h1>{this.state.data}</h1>
      </div>
    );
  }
}

export default App;