import React, { Component } from 'react';
import '../styles/Cart.scss';

class Cart extends Component {
    state = {
        subTotal: 0,
        taxRate: 0.10,
        taxTotal: 0,
        Total: 0,
        shipping: 4.99
    }

    componentDidUpdate() {
        // console.log(this.props);
    }

    componentDidMount() {
        this.calcSubTotal();
    }

    componentWillReceiveProps() {
        this.calcSubTotal();
    }

    calcSubTotal = () => {
        let { cart } = this.props;
        var subTotal = 0;
        cart.forEach(product => {
            subTotal += product.price * product.quantity
        })
        this.setState({
            subTotal: subTotal
        }, () => {
            this.calcTax();
        });
    }

    calcTax = () => {
        let { taxRate, subTotal } = this.state;
        let taxes = (subTotal * taxRate);
        this.setState({
            taxTotal: taxes
        }, () => {
            this.calcTotal();
        });
    }

    calcTotal = () => {
        let { taxTotal, subTotal, shipping } = this.state;
        let {cart} = this.props;
        var total = taxTotal + subTotal;
        if(cart.length > 0) {
            total += shipping
        }
        this.setState({
            Total: total
        })
    }

    render() {
        let { cart, toggleCart, removeFromCart } = this.props;
        let { subTotal, Total, shipping, taxTotal } = this.state;
        let cart_id = 0;

        return (
            <div className="cart-wrapper">
                
                <div className="cart-container">
                    <button className="close-cart" onClick={toggleCart}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"/></svg>
                    </button>
                    <h1>Shopping Cart</h1>
                    <div className="cart">
                        <div className="cart-items">
                            {cart.length === 0 ?
                                <>
                                    <div className="no-product-in-cart">
                                        <h4>Your shopping cart is empty!</h4>
                                        <button className="start-shopping" onClick={toggleCart}>Start Shopping</button>
                                    </div>
                                </> :
                                <>
                                    {cart.map(item =>
                                        <div className="product-in-cart" key={cart_id += 1}>
                                            <div className="product-thumbnail">
                                            </div>
                                            <div className="delete-product" 
                                                onClick={() => removeFromCart(item.id)}
                                                >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z" /></svg>
                                            </div>
                                            <div className="product-info">
                                                <p className="product-name">{item.name}</p>
                                                <p className="product-price">${item.price.toFixed(2)}</p>
                                                <p className="product-description">{item.description}</p>
                                                <p className="quantity-ordered">Quantity: {item.quantity}</p>
                                                <p className="total">Total: ${((item.quantity * item.price)).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    )}
                                </>
                            }
                        </div>
                        <div className="cart-totals">
                            <h4>Shopping Cart Totals</h4>
                            <div className="cart-totals-container">
                                <div className="shopping-cart-totals">
                                    <p className="line-total">SUBTOTAL: <span>${subTotal.toFixed(2)}</span></p>
                                    <p className="line-total">TAX: <span>${taxTotal.toFixed(2)}</span></p>
                                    {cart.length > 0 ? <p className="line-total">SHIPPING: <span>${shipping.toFixed(2)}</span></p> : null}
                                    <p className="line-total" style={{ backgroundColor: "#58A4B0", padding: "5px", fontWeight: "bold", color: "white" }}>TOTAL: <span>${Total.toFixed(2)}</span></p>
                                </div>
                                <hr />
                                <button className="checkout">Continue to checkout</button>
                                <p className="disclaimer">The estimated tax will be confirmed once you added your shipping address in checkout.</p>
                                <p className="disclaimer">30 day return. Read more about our policy <span style={{ textDecoration: "underline", cursor: "pointer" }}>return and refund.</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Cart;