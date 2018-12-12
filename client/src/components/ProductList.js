import React from 'react';
import Product from './Product';

const ProductList = ({products, remove, deleting, edit}) => (
    <>
        {products.map(product => (
            <Product {...product} key={product.id} remove={remove} deleting={deleting} edit={edit}/>
        ))}
    </>
)

export default ProductList;