import React from 'react';
import '../styles/Product.scss';


const Product = ({id, name, description, price}) => (
    
    <div className="product">
        <div className="product-image"></div>
        <div className="product-info">
            <h4 className="product-name">{name}</h4>
            <p className="product-description">{description}</p>
            <h4 className="product-price">${price}</h4>
        </div>
    </div>
)

export default Product;