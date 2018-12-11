import React from 'react';
import Product from './Product';

const ProductList = ({products}) => (
    <>
        {products.map(product => (
            <Product {...product} key={product.id}/>
        ))}
    </>
)

export default ProductList;