import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../styles/list.css';
import queryString from "query-string";
import shippingFreeImage from '../assets/Icono_Envio.png'

class List extends Component {
    constructor(props) {
      super(props);
      this.state = {
        category: "",
        results: [],
        theQueryString: queryString.parse(this.props.location.search),
        loading: true,
        error: false
      };
    }

    searchTheProduct(name) {  //llamamos a nuestra API y traemos la informacion y pisamos nuesto state
        fetch('http://localhost:8080/api/items/?q=' + name)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            this.setState ({
                category: data.categories,
                results: data.items,
                loading: false
            })            
        })
        .catch(() => {
            this.setState({
                error: true
            })
        })      
      }
    
      componentWillReceiveProps(nextProps) { {/*tomamos nuestro query params */}
        const theQuery = queryString.parse(nextProps.location.search);
        const { search } = theQuery;
        if (search !== this.state.theQueryString) { {/* comparamos que nuestro query params coincida con nuestros datos del state */}
          this.setState({ loading: true }, 
            this.searchTheProduct(search)
          )
        }
      }
      componentDidMount() { {/*ejecutamos la funcion justo después de que el componente haya sido montado en el DOM*/}
        this.searchTheProduct(this.state.theQueryString.search)
      }

      render () {
        if (this.state.error){ {/* aca generamos un aviso si la informacion del nuestra api no llega */}
            return <p className='error-text' alt='algo anda mal'>Opss! algo anda mal</p>            
        }
        if (this.state.loading) { {/* aca generamos un aviso si todo esta ok */}
          return <p className='loading-products'> Cargando los productos...</p>;
        };
        
        const products = this.state.results.map(theProduct => (                                  
            <Link to={`/items/${theProduct.id}`}>
                <div className="total-container">
                    <div className="product-container">
                        <div className="picture"><img src={theProduct.picture} alt={theProduct.picture}/></div>
                        <div className="price-title-container">
                            <div className="price">
                            <p className="whole-number">$ {theProduct.price.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p> {/* Permite separar los decimales con '.' o con ',' */}
                            {(parseInt(theProduct.price.decimals) === 0) ? <sup className='cents'>00</sup> : <sup className='cents'>{theProduct.price.decimals}</sup>}
                            {/*hacemos un ternario donde la condicion es: si el decinmal es igual a cero debe colocar los dos ceros, de lo contrario el numero decimal de do cifras */}
                                {theProduct.free_shipping && ( {/*si theProduct.free_shipping = true se renderiza el siguiente HTML especificado despues de && */},
                                <span className="shipping">
                                <img src={shippingFreeImage} alt="envio gratis" />
                                </span>)}
                            </div>                            
                            <p className="product-title">{theProduct.title}</p>              
                        </div>
                    <p className="ubication">{theProduct.location}</p> 
                    </div>
                </div>                        
            </Link>            
        ));

        return(    
            <div>        
                <div className="breadcrumbList">
                    <p>{this.state.category && this.state.category.name}</p>                    
                </div>
                <div>{products}</div>
            </div>
        )
    }
}
export default List;