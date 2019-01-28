import React, { Component } from 'react';
import Header from './components/Header';
import { BrowserRouter, Route } from "react-router-dom";


class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Header path='/items' component={Header}/>

          </div>
        </BrowserRouter> 
      </div>
    );
  }
}

export default App;
