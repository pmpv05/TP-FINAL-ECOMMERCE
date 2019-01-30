import React from "react";
import { Link } from "react-router-dom";
import '../styles/list.css';

const List = props => {
    console.log(props)
    return(
        <div>
            {props.infoEndpoint.map((prod , index) => {
                return(
                    <div>
                        <div className="breadcrumb">
                            <p>{prod.categories.name}</p>
                        </div>
                        <Link to={`/items/:${prod.items.id}`}>
                            <div className="total-container" key={`product- ${index}`}>
                                <div className="product-container">
                                    <div className="picture">{prod.items.picture}</div>
                                    <div className="price-title-container">
                                        <div className="price">
                                            <p className="whole-number">{prod.items.price.amount}</p><p className="cents">{prod.items.price.decimals}</p>
                                        </div>
                                        <p className="product-title">{prod.items.title}</p>              
                                </div>
                                <p class="ubication">{prod.items.location}</p> 
                                </div>
                            </div>                        
                        </Link>
                    </div>
                )
            })}
        </div>
    )

    
}   



export default List;