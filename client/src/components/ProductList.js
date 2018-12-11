import React from 'react';
import Product from './Product';

const ProductList = ({products, remove}) => (
    <>
        {products.map(product => (
            <Product {...product} key={product.id} remove={remove}/>
        ))}
    </>
)

export default ProductList;