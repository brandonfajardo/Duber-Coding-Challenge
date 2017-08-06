import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchLocations, updateError } from '../actions'
import CurrencyInput from './currencyInput'
import ZipCodeInput from './zipCodeInput'

class App extends Component {
  constructor(props){
    super(props)

    this.onFetchLocations = this.onFetchLocations.bind(this)
  }

  onFetchLocations() {
    const { zipCodeVal, currencyVal } = this.props

    if (zipCodeVal){
      this.props.fetchLocations({ zipCodeVal, currencyVal })
    } else {
      this.props.updateError('Zip code cannot be left blank')
    }
  }

  renderError() {
    return (
      <p style={{color: 'red', marginTop: '10px', fontSize: '12px'}}>{this.props.error}</p>
    )
  }

  render() {
    return (
      <div style={{marginTop: '10px'}}>
        <h1>DÜBER</h1>
        
        <p>Enter an amount you would like to spend</p>
        <div>$<CurrencyInput /></div>
        
        <p style={{marginTop: '20px'}}>Enter your zip code</p>
        <ZipCodeInput />

        <button
          style={{width: '300px', marginTop: '20px'}}
          onClick={() => this.onFetchLocations()}
        >
          Submit
        </button>
        
        {this.props.error && this.renderError()}

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  zipCodeVal: state.zipCodeInput.zipCodeVal,
  currencyVal: state.currencyInput.currencyVal,
  error: state.error.message,
})

const mapDispatchToProps = {
  fetchLocations,
  updateError
}

export default connect(mapStateToProps, mapDispatchToProps)(App);