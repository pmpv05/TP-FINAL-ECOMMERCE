import React, { Component } from 'react';
import '../styles/home.css';
import LogoAda from '../assets/Ada_Iso_Blanco.png';
import SearchIcon from '../assets/Icono_Search.png';

class SearchBar extends Component {
    constructor (props){
        super (props);
        this.state = {
           inputValue: '' 

        }    
    }

    handleOnchangeInput(event) {
        this.setState  (
            {inputValue: event.target.value}); // aca pisamos el State con lo que escribimos en el Input
    }

    handleKeyPress(event){ //hacemos esta funcion para que haga la busqueds cuando tecleamos entrer.
        if(event.which === 13) {
            const {inputValue} = this.state //aca pisamos el state.
            this.props.searchTheProduct(inputValue)
        }
    }  

    render() {
        console.log(this.state.inputValue)
        return (        
            <div>
               <div className="form">
                    <div className="header-input">
                        <img className="ada-logo" src={LogoAda} alt=""/>
                        <div className="InputAddOn">
                            <input className="InputAddOn-field" type="text" placeholder="Nunca dejes de buscar" 
                            value={this.state.inputValue} onKeyPress={event => this.handleKeyPress(event)} onChange={(event) => this.handleOnchangeInput(event)}/>
                            <div className="InputAddOn-item" onClick={(inputValue) => this.props.searchTheProduct(inputValue)} ><img src={SearchIcon} alt=""/></div> {/*aqui hacemos un onClick con un this.props.function que pasamos por parametro en APP*/}
                        </div>
                    </div>
                </div>
            </div>
        );
      }
}

export default SearchBar;