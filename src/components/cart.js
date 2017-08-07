import React, { Component } from 'react'
import { removeFromCart, buyCartItems, updateError, toggleSuccess } from '../actions'
import { connect } from 'react-redux'

const styles = {
    CartContainer: {
        border: '1px solid lightgray', 
        padding: '15px', 
        marginTop: '15px', 
        marginBottom: '15px'
    },
    Delete: {
        float: 'right', 
        cursor: 'pointer'
    },
    PurchaseButton: {
        width: '300px', 
        marginTop: '15px'
    },
    Fonts: {
        fontSize: '12px'
    },
    Error: {
        color: 'red', 
        fontSize: '12px', 
        marginTop: '10px'
    },
    Success: {
        color: 'green', 
        fontSize: '12px', 
        marginTop: '10px'
    }
}

class Cart extends Component {
    constructor(props){
        super(props)

        this.buyItems = this.buyItems.bind(this)
        this.renderError = this.renderError.bind(this)
        this.renderSuccessMessage = this.renderSuccessMessage.bind(this)
    }

    buyItems() {
        const retailerNames = this.props.cartItems.map((cartItem) => {
            return cartItem.retailerName
        })
        
        const counts = {};
        for (var i = 0; i < retailerNames.length; i++) {
            const num = retailerNames[i];
            counts[num] = counts[num] ? counts[num] + 1 : 1;
        }

        if (this.props.cartItems.length === 0){
            this.props.updateError("Your cart is empty.")
        } else if (this.props.currencyVal <= 0){
           this.props.updateError("You cannot afford this purchase.")
        } else if (Object.keys(counts).length < 3){
            this.props.updateError("You must purchase at least 1 product from 3 different retailers.")
        } else {
            this.props.buyCartItems()
        }
    }

    renderError() {
        return <p style={styles.Error}>{this.props.error}</p>
    }

    renderSuccessMessage() {
        setTimeout(() => {
            this.props.toggleSuccess()
        }, 2000)
        return <p style={styles.Success}>{this.props.successMessage}</p>
    }

    render() {
        const arrayMax = (array) => array.reduce((a,b) => Math.max(a, b))
        const arrayMin = (array) => array.reduce((a,b) => Math.min(a, b))
        return (
            <div style={styles.CartContainer}>
                <h3>Cart</h3>
                {this.props.successMessage && this.renderSuccessMessage()}
                <p>Amount to spend ${this.props.currencyVal}</p>
                <p>Items to purchase</p>
                {this.props.cartItems.map((cartItem) => {
                    const THC = cartItem.thc.length === 1 ? `(THC: ${cartItem.thc[0]})` : `(THC: ${arrayMin(cartItem.thc)} - ${arrayMax(cartItem.thc)})`
                    return (
                        <div>
                            <span>{`$${cartItem.price} - ${cartItem.name} ${THC}`}</span>
                            <span
                                onClick={() => this.props.removeFromCart({ id: cartItem.id, price: cartItem.price })}
                                style={styles.Delete}
                            >
                                x
                            </span>
                        </div>
                    )
                })}
                <button onClick={() => this.buyItems()} style={styles.PurchaseButton}>Purchase</button>
                
                {this.props.error && this.renderError()}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    cartItems: state.cart.cartItems,
    currencyVal: state.currencyInput.currencyVal,
    error: state.error.message,
    successMessage: state.cart.successMessage
})

const mapDispatchToProps = {
    removeFromCart,
    buyCartItems,
    updateError,
    toggleSuccess
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)