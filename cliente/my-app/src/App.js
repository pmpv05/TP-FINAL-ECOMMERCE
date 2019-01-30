import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import SearchBar from './components/SearchBar';
import List from './components/List';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      products: []
    } 
  }

  searchTheProduct(name) {  
    fetch('http://localhost:8080/api/items/?q=' + name)
    .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({ products: data });
      })
       
  }

  render() {
    return (
      <div className="App">
        <SearchBar searchTheProduct={name => this.searchTheProduct(name)}/>
        
        <BrowserRouter>
          <div>
          <Route exact path="/items"
              render={() => (
                <List
                  infoEndpoint={this.state.products}/>
                  
                )}
              />
          </div>
        </BrowserRouter> 
      </div>  
    );
  }
}

export default App;
