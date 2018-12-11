import React, {Component} from 'react';
import axios from 'axios';
import '../styles/Department.scss';
import ProductList from './ProductList';
import NavBar from './NavBar';

class Department extends Component {

    state = {
        products: [],
        department: "",
        deleting: false
    }

    componentDidUpdate() {
        console.log(this.state);
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

    toggleDelete = () => {
        
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
        let {department, products} = this.state;
        return(
            <>
                <NavBar />
                <div className="department-container">
                    <h1 className="department-name">{department}</h1>
                        <div className="product-container">
                            <ProductList products={products} remove={this.deleteProduct}/> 
                        </div>
                </div>
            </>
        )
    }
}


export default Department;