import React, { Component } from 'react';
import '../styles/home.css';
import LogoAda from '../assets/Ada_Iso_Blanco.png';
import SearchIcon from '../assets/Icono_Search.png';
import { withRouter } from 'react-router'

class SearchBar extends Component {
    constructor (props){
        super (props);
        this.state = {
           inputValue: '' 

        }    
    }

    handleOnClickSearchButton(){
        const {inputValue} = this.state
        if(inputValue.trim() !== ''){ //aqui nos aseguramos de que no existan espacios en blanco
            this.props.history.push(`/items?search=${this.state.inputValue}`)
            this.setState({
                inputValue: ''
            })
        }
    }

    handleOnchangeInput(event) {
        this.setState  (
            {inputValue: event.target.value}); // aca pisamos el State con lo que escribimos en el Input
    }

    handleKeyPress(event){
        const {inputValue} = this.state
        if(inputValue.trim() !== ''){
            if (event.which === 13){
                this.props.history.push(`/items?search=${this.state.inputValue}`)
                this.setState({
                    inputValue: '' 
                }) //pisamos la informacion nuevamente para que quede vacio.
            }
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
                            <div className="InputAddOn-item" onClick={(event) => this.handleOnClickSearchButton(event)} ><img src={SearchIcon} alt=""/></div> {/*aqui hacemos un onClick con un this.props.function que pasamos por parametro en APP*/}
                        </div>
                    </div>
                </div>
            </div>
        );
      }
}

export default withRouter (SearchBar);