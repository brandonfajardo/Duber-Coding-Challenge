import React, { Component } from 'react'
import CurrencyInput from './currencyInput'

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>DÜBER</h1>
        <p>Enter an amount you would like to spend</p>
        <div>$<CurrencyInput /></div>
      </div>
    );
  }
}
