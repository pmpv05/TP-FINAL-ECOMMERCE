import React, { Component } from 'react';
//import { Link } from "react-router-dom";
import '../styles/product.css';
import Breadcrumb from './Breadcrumb'

class Detail extends Component {
    constructor(prosp) {
        super(prosp) 
        this.state = {
            breadcrumbCategories: '',
            results: '',
            descriptionProduct: '',
            loading: true,
            error: false
        };
    }

    componentDidMount() {
        fetch('http://localhost:8080/api/items/' + this.props.match.params.id)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            this.setState ({
                breadcrumbCategories: data.categories,
                results: data.item,
                descriptionProduct: data.description, 
                loading: false
            })            
        })
        .catch((err) => {
            console.log(err + 'Algo no anda bien')
            this.setState({
                error: true
            })
        })  
    }

    
    render () {
        if (this.state.error){
            return <p className='error-text' alt='algo anda mal'>Opss! algo anda mal</p>            
        }
        if (this.state.loading) {
          return <p className='loading-products'> Cargando los productos...</p>;
        };        
        
        const theSelectProduct = this.state.results;
        return (
            <div>
            <Breadcrumb categories={this.state.breadcrumbCategories} />
            <div className="total-container">                
                <div className="item-container">
                    <div className="picture-container">
                        <img src={theSelectProduct.picture} alt={theSelectProduct.title}/>
                    </div>
                    <div className="item-title">
                        <div className="item-status">
                            <p>{theSelectProduct.condition} - {theSelectProduct.sold} vendidos</p>                            
                        </div>
                        <h1>{theSelectProduct.title}</h1>
                        <div className="price">
                            <p className="whole-number">$ {theSelectProduct.price.amount}</p><sup className="cents">{theSelectProduct.price.decimal}</sup>
                        </div>
                        <button id="buyIt">Comprar</button>
                    </div>
                </div>
                <div className="description-container">
                    <h3>Descripción del Producto</h3>
                    <p className="the-description">{this.state.descriptionProduct}</p>
                </div>
            </div>
            </div>
        )

    }          

}
export default Detail;