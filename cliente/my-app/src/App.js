import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import SearchBar from './components/SearchBar';
import List from './components/List';

const SEARCH_BY_NAME =
  "https://api.mercadolibre.com/sites/MLA/search?limit=4&q="; // creamos una constante de la ruta para que este el codigo más organizado

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      products: []
    } 
  }

  searchTheProduct(name) {        
    const url = `${SEARCH_BY_NAME}${name}`;
    console.log(url)//concatenamos la URL con el nombre del objeto
    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data.results);
        this.setState({ products: data.results });
      });
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
                  infoEndpoint={this.state.products}/>)}
            />
          </div>
        </BrowserRouter> 
      </div>  
    );
  }
}

export default App;
