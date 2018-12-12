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
    }

    componentDidMount() {
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
        },() => {
            this.calcTotal();
        });
    }

    calcTotal = () => {
        let {taxTotal, subTotal} = this.state;
        var total = taxTotal + subTotal;
        this.setState({
            Total: total
        })
    }

    render() {

        let { cart, toggleCart } = this.props;
        let { subTotal, Total, shipping, taxTotal } = this.state;

        return (
            <div className="cart-wrapper">
                <div className="cart-container">
                    <h1>Shopping Cart</h1>
                    <div className="cart">
                        <div className="cart-items">
                            {cart.length === 0 ?
                                <>
                                    <h4>Your shopping cart is empty!</h4>
                                    <button className="start-shopping" onClick={toggleCart}>Start Shopping</button>
                                </> : null
                            }
                            {cart.forEach(product => {
                                return (
                                    <div className="product">
                                        <img src="https://picsum.photos/150?random" alt=""></img>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="cart-totals">
                            <h4>Shopping Cart Totals</h4>
                            <div className="cart-totals-container">
                                <div className="shopping-cart-totals">
                                    <p className="line-total">SUBTOTAL: <span>${subTotal.toFixed(2)}</span></p>
                                    <p className="line-total">TAX: <span>${taxTotal.toFixed(2)}</span></p>
                                    <p className="line-total">SHIPPING: <span>${shipping.toFixed(2)}</span></p>
                                    <p className="line-total">TOTAL: <span>${Total.toFixed(2)}</span></p>
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