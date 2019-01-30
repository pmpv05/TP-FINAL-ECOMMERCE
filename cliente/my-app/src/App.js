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
    fetch('http://localhost:8080/api/items/' + name)
    .then(res => res.json())
      .then(data => {
        console.log(data.results);
        this.setState({ products: data.results });
      })
       
  }

  render() {
    return (
      <div className="App">
        <SearchBar searchTheProduct={name => this.searchTheProduct(name)}/>
        
        <BrowserRouter>
          <div>
          <Route
              exact
              path="/productos"
              render={() => (
                <List
                  infoEndpoint={this.state.products.data.results}/>)}
              />
          </div>
        </BrowserRouter> 
      </div>  
    );
  }
}

export default App;
