import React, { Component } from 'react';
import SearchBar from './components/SearchBar';
import List from './components/List';
import Detail from './components/Detail';
import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
      <BrowserRouter>
        <div>
          <SearchBar />
          <Route exact path='/items' component={List}/>
          <Route path='/items/:id' component={Detail}/>
        </div>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
