import React from 'react'
import CurrencyInput from 'react-currency-masked-input'
import { changeCurrency } from '../actions'
import { connect } from 'react-redux'

const MoneyInput = (props) => {
    return (
        <CurrencyInput 
            value={props.currencyVal} 
            onChange={(e) => props.changeCurrency(e.target.value)}
        />
    )
}

const mapStateToProps = (state) => ({
    currencyVal: state.currencyInput.currencyVal,
})

const mapDispatchToProps = {
    changeCurrency,
}

export default connect(mapStateToProps, mapDispatchToProps)(MoneyInput);