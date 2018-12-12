import React, {Component} from 'react';

class EditProductForm extends Component {
    state= {
        name: "",
        price: "",
        description: ""
    }

    componentDidMount() {
        let {name, price, description} = this.props;
        this.setState({
            name: name,
            description: description,
            price: price
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        let {id, edit} = this.props;
        let {name, description, price} = this.state;
        e.preventDefault();
        edit(id, name, description, price);
    }

    render() {
        let {name, description, price} = this.state;
        return(
            <form onSubmit={this.handleSubmit}>
                <input 
                    name="name"
                    value={name}
                    placeholder="Product Name:"
                    required
                    onChange={this.handleChange}
                />
                <textarea
                    name="description"
                    value={description}
                    placeholder="Product Description"
                    required
                    onChange={this.handleChange}
                />
                <input 
                    name="price"
                    value={price}
                    placeholder="Product Price:"
                    required
                    onChange={this.handleChange}
                />
                <input 
                    type="submit"
                />
            </form>
        )
    }

}


export default EditProductForm;