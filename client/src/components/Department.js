import React, { Component } from 'react';
import axios from 'axios';
import '../styles/Department.scss';
import ProductList from './ProductList';
import NavBar from './NavBar';
import styled from 'styled-components';
import Cart from './Cart';

class Department extends Component {

    state = {
        products: [],
        department: "",
        deleting: false,
        editing: false,
        cart: [],
        cartOpen: false
    }

    componentDidUpdate() {
        let { cart } = this.state;
        if (cart !== null && cart.length > 0) {
            localStorage.setItem('myCart', JSON.stringify(cart));
        }
    }

    componentDidMount() {
        var cart = JSON.parse(localStorage.getItem('myCart'));
        if (cart !== null && cart.length > 0) {
            this.setState({
                cart: cart
            })
        }
        let { id } = this.props.match.params;
        axios.get(`/api/departments/${id}/products`)
            .then(res => {
                this.setState({
                    products: res.data
                })
                this.getDepartment();
            })
    }

    removeFromCart = (id) => {
        let { cart } = this.state;
        this.setState({
            cart: cart.filter(item => {
                return item.id !== id
            })
        }, () => {
            localStorage.clear();
        })
    }

    addToCart = (id, name, description, price, numberOrdered) => {
        let quantity = parseInt(numberOrdered);
        let { cart } = this.state;
        const product = { id, name, description, price, quantity };
        if (this.checkForDupes(cart, id)) {
            this.setState({
                cart: cart.map(item => {
                    if (item.id === id) {
                        item.quantity += quantity
                    }
                    return item
                })
            })
        } else {
            this.setState({
                cart: [...cart, product]
            })
        }
    }

    checkForDupes = (object, value) => {
        for (var i = 0; i < object.length; i++) {
            if (object[i].id === value) {
                return true;
            }
        }
    }

    deleteProduct = (id) => {
        let { products } = this.state;
        this.setState({
            products: products.filter(p => {
                return p.id !== id
            })
        })
    }

    editProduct = (product_id, name, description, price) => {
        const { id } = this.props.match.params;
        axios.put(`/api/departments/${id}/products/${product_id}`, { product_id, name, description, price })
            .then(res => {
                const products = this.state.products.map(p => {
                    if (p.id === product_id)
                        return res.data;
                    return p;
                });
                this.setState({
                    products,
                    editing: false
                })
            })
    }

    toggleCart = () => {
        let { cartOpen } = this.state;
        this.setState({
            cartOpen: !cartOpen
        })
    }

    toggleDelete = () => {
        let { deleting } = this.state;
        this.setState({
            deleting: !deleting,
            editing: false
        })
    }

    toggleEdit = () => {
        let { editing } = this.state;
        this.setState({
            editing: !editing,
            deleting: false
        })

    }

    getDepartment = () => {
        let { id } = this.props.match.params;
        axios.get(`/api/departments/${id}`)
            .then(res => {
                this.setState({
                    department: res.data.name
                });
            });
    }

    render() {
        let { department, products, deleting, editing, cart, cartOpen } = this.state;
        return (
            <>
                <NavBar cart={cart} toggleCart={this.toggleCart} />
                {cartOpen ? <Cart cart={cart} toggleCart={this.toggleCart} removeFromCart={this.removeFromCart} /> : null}
                <div className="department-container">
                    <ToggleButtons>
                        <button className="toggle" onClick={this.toggleDelete} style={deleting ? { backgroundColor: "black", color: "white" } : null}>Delete Items</button>
                        <button className="toggle" onClick={this.toggleEdit} style={editing ? { backgroundColor: "black", color: "white" } : null}>Edit Products</button>
                    </ToggleButtons>
                    <h1 className="department-name">{department}</h1>
                    <div className="product-container">
                        <ProductList
                            products={products}
                            remove={this.deleteProduct}
                            deleting={deleting}
                            edit={this.editProduct}
                            editing={editing}
                            add={this.addToCart}
                        />
                    </div>
                </div>
            </>
        )
    }
}

const ToggleButtons = styled.div`
    align-self: flex-end;
`;




export default Department;