import React from 'react';
import Product from './Product';

const ProductList = ({products, remove, deleting, edit, editing, add}) => (
    <>
        {products.map(product => (
            <Product 
                {...product} 
                key={product.id} 
                remove={remove} 
                deleting={deleting} 
                edit={edit} 
                editing={editing}
                add={add}
            />
        ))}
    </>
)

export default ProductList;