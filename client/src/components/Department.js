import React, {Component} from 'react';
import axios from 'axios';
import '../styles/Department.scss';
import ProductList from './ProductList';
import NavBar from './NavBar';
import styled from 'styled-components';

class Department extends Component {

    state = {
        products: [],
        department: "",
        deleting: false,
        editing: false
    }

    componentDidMount() {
        let {id} = this.props.match.params;
        axios.get(`/api/departments/${id}/products`)
        .then(res => {
            this.setState({
                products: res.data
            })
            this.getDepartment();
        })        
    }

    deleteProduct = (id) => {
        let {products} = this.state;
        this.setState({
            products: products.filter(p => {
                return p.id !== id
            })
        })
    }

    editProduct = (product_id, name, description, price) => {
        const {id} = this.props.match.params;
        axios.put(`/api/departments/${id}/products/${product_id}`, {product_id, name, description, price})
        .then(res => {
            const products = this.state.products.map(p => {
                if(p.id === product_id)
                    return res.data;
                return p;
            });
            this.setState({
                products,
                editing: false
            })
        })
    }

    toggleDelete = () => {
    let {deleting} = this.state;
        this.setState({
            deleting: !deleting,
            editing: false
        })
    }

    toggleEdit = () => {
        let {editing} = this.state;
        this.setState({
            editing: !editing,
            deleting: false
        })

    }

    getDepartment = () => {
        let {id} = this.props.match.params;
        axios.get(`/api/departments/${id}`)
        .then(res => {
            this.setState({
                department: res.data.name
            });
        });
    }

    render() {
        let {department, products, deleting, editing} = this.state;
        return(
            <>
                <NavBar />
                <div className="department-container">
                    <ToggleButtons>
                        <button className="toggle" onClick={this.toggleDelete} style={deleting ? {backgroundColor: "black", color: "white"}: null}>Delete Items</button>
                        <button className="toggle" onClick={this.toggleEdit} style={editing ? {backgroundColor: "black", color: "white"}: null}>Edit Products</button>
                    </ToggleButtons>
                    <h1 className="department-name">{department}</h1>
                        <div className="product-container">
                            <ProductList 
                                products={products} 
                                remove={this.deleteProduct}
                                deleting={deleting} 
                                edit={this.editProduct}
                                editing={editing}
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