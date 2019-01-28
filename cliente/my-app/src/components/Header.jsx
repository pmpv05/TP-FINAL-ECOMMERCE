import React, { Component } from 'react';
import '../home.css';
import LogoAda from '../assets/Ada_Iso_Blanco.png';
import SearchIcon from '../assets/Icono_Search.png';

class Header extends Component {
    constructor (props){
        super (props);
        this.state = {
           inputValue: '' 

        }    
    }

    render() {
        return (        
            <div>
               <form>
                    <div class="header-input">
                        <img class="ada-logo" src={LogoAda} alt=""/>
                        <div class="InputAddOn">
                            <input class="InputAddOn-field" type="text" placeholder="Nunca dejes de buscar"/>
                            <div class="InputAddOn-item"><img src={SearchIcon} alt=""/></div>
                        </div>
                    </div>
                </form>                
            </div>
        );
      }




}

export default Header;