import React from 'react';
import Product from './Product';

const ProductList = ({products, remove, deleting, edit, editing}) => (
    <>
        {products.map(product => (
            <Product 
                {...product} 
                key={product.id} 
                remove={remove} 
                deleting={deleting} 
                edit={edit} 
                editing={editing}
            />
        ))}
    </>
)

export default ProductList;