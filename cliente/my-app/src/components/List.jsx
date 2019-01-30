import React, { Component } from 'react';
import '../list.css';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }    

    render() {
        const {infoEndpoint} = this.props
        console.log(infoEndpoint)
        const theItemProduct =   infoEndpoint.map(item => <div className={item.resu}>
        <p></p>
    </div> )     

        return (
            <div>
            
                <div className="breadcrumb">
                    <p>Comics e Hitorietas</p>
                </div>
                <div className="total-container">   
                        <div className="product-container">   
                            <div className="picture"></div>
                            <div className="price-title-container">
                                <div className="price">
                                    <p className="whole-number">$ 2.000</p><p className="cents">,50</p>
                                </div>
                                <p className="product-title">Lorem ipsum dolor sit amet consectetur adipisicing elit. Et illum architecto recusandae beatae, animi ratione quam,  </p>              
                            </div>
                        </div>            
                        <p className="ubication">Capital federal</p>        
                </div>
                
            </div>
    
        )
    
    }
}



export default List;