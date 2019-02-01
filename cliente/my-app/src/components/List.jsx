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

    searchTheProduct(name) {  
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
    
      componentWillReceiveProps(nextProps) {
        const theQuery = queryString.parse(nextProps.location.search);
        const { search } = theQuery;
        if (search !== this.state.theQueryString) {
          this.setState({ loading: true },
            this.searchTheProduct(search)
          )
        }
      }
      componentDidMount() {
        this.searchTheProduct(this.state.theQueryString.search)
      }

      render () {
        if (this.state.error){
            return <p className='error-text' alt='algo anda mal'>Opss! algo anda mal</p>            
        }
        if (this.state.loading) {
          return <p className='loading-products'> Cargando los productos...</p>;
        };
        
        const products = this.state.results.map(theProduct => (                                  
            <Link to={`/items/${theProduct.id}`}>
                <div className="total-container">
                    <div className="product-container">
                        <div className="picture"><img src={theProduct.picture} alt={theProduct.picture}/></div>
                        <div className="price-title-container">
                            <div className="price">
                                <p className="whole-number">$ {theProduct.price.amount}</p>
                                <sup className="cents">{theProduct.price.decimals}</sup>
                                {theProduct.free_shipping && (
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
                <div className="breadcrumb">
                    <p>{this.state.category && this.state.category.name}</p>                    
                </div>
                <div>{products}</div>
            </div>
        )
    }
}
export default List;