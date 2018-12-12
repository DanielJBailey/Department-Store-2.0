import React from 'react';
import EditProductForm from './EditProductForm';
import '../styles/Product.scss';


const Product = ({ id, name, description, price, remove, deleting, edit, editing }) => (

    <div className="product">
        <div className="product-image">
            <img src="https://picsum.photos/300?random" alt=""></img>
        </div>
        <div className="product-info">
            {editing ? <EditProductForm id={id} name={name} description={description} price={price} edit={edit} /> : deleting ? 

            <>
                <h4 className="product-name">{name}</h4>
                <hr />
                <p className="product-description">{description}</p>
                <h4 className="product-price">${price.toFixed(2)}</h4>
                <button className="delete" onClick={() => remove(id)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M381.6 80l-34-56.7C338.9 8.8 323.3 0 306.4 0H205.6c-16.9 0-32.5 8.8-41.2 23.3l-34 56.7H40c-13.3 0-24 10.7-24 24v12c0 6.6 5.4 12 12 12h16.4L76 468.4c2.3 24.7 23 43.6 47.8 43.6h264.5c24.8 0 45.5-18.9 47.8-43.6L467.6 128H484c6.6 0 12-5.4 12-12v-12c0-13.3-10.7-24-24-24h-90.4zm-176-32h100.8l19.2 32H186.4l19.2-32zm182.6 416H123.8L92.6 128h326.7l-31.1 336z" /></svg>
                Delete</button> 
            </>
            : (!editing && !deleting) ?
            <>
                <h4 className="product-name">{name}</h4>
                <hr />
                <p className="product-description">{description}</p>
                <h4 className="product-price">${price.toFixed(2)}</h4>
                <button className="add-to-cart">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M551.991 64H144.28l-8.726-44.608C133.35 8.128 123.478 0 112 0H12C5.373 0 0 5.373 0 12v24c0 6.627 5.373 12 12 12h80.24l69.594 355.701C150.796 415.201 144 430.802 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-18.136-7.556-34.496-19.676-46.142l1.035-4.757c3.254-14.96-8.142-29.101-23.452-29.101H203.76l-9.39-48h312.405c11.29 0 21.054-7.869 23.452-18.902l45.216-208C578.695 78.139 567.299 64 551.991 64zM208 472c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm256 0c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm23.438-200H184.98l-31.31-160h368.548l-34.78 160z" /></svg>
                    Add to cart</button>
            </>  : null}
        </div>
    </div>
)

export default Product;