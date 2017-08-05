import React, { Component } from 'react'
import CurrencyInput from 'react-currency-masked-input'
import { changeCurrency } from '../actions'
import { connect } from 'react-redux'

class MoneyInput extends Component {
    render() {
        return (
            <CurrencyInput 
            value={this.props.currencyVal} 
            onChange={(e) => this.props.changeCurrency(e.target.value)}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    currencyVal: state.currencyInput.currencyVal,
})

const mapDispatchToProps = {
    changeCurrency,
}

export default connect(mapStateToProps, mapDispatchToProps)(MoneyInput);