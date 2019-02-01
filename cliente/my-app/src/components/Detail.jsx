import React, { Component } from 'react';
//import { Link } from "react-router-dom";
import '../styles/product.css';
//import queryString from "query-string";
//import shippingFreeImage from '../assets/Icono_Envio.png'

class Detail extends Component {
    constructor(prosp) {
        super(prosp) 
        this.state = {
            breadcrumbCategories: '',
            results: {},
            categoryId: '',
            descriptionProduct: '',
            loading: true,
            error: false
        };
    }

    showTheSelectedProduct(id) {
        fetch('http://localhost:8080/api/items/' + id)
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
        .catch(() => {
            this.setState({
                error: true
            })
        })  
    }

    componentDidMount() {
        this.showTheSelectedProduct()
    }

    render () {
        if (this.state.error){
            return <p className='error-text' alt='algo anda mal'>Opss! algo anda mal</p>            
        }
        if (this.state.loading) {
          return <p className='loading-products'> Cargando los productos...</p>;
        };        
        
        const breadcrumb = this.state.breadcrumbCategories.map (titleCategory => (
        <div class="breadcrumb">
            <p>{titleCategory}</p> >  </div>
        ))
        return (
            <div>
            <div className="breadcrumb">{breadcrumb}</div>
            <div className="total-container">                
                <div className="item-container">
                    <div className="picture-container"></div>
                    <div className="item-title">
                        <div className="item-status">
                            <p>{this.state.results.condition}</p>
                            <p>{this.state.results.sold} vendidos</p>
                        </div>
                        <h1>{this.state.results.title}</h1>
                        <div className="price">
                            <p className="whole-number">$ {this.state.results.price.amount}</p><sup className="cents">{this.state.results.price.decimal}</sup>
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