import React, { Component } from 'react'
import RetailerList from './retailerList'
import { connect } from 'react-redux'
import { fetchLocations, updateError, addToCart } from '../actions'
import CurrencyInput from './currencyInput'
import ZipCodeInput from './zipCodeInput'
import Cart from './cart'

const styles = {
  Error: {
    color: 'red', 
    marginTop: '10px', 
    fontSize: '12px'
  },
  AppContainer: {
    marginTop: '10px'
  },
  ZipCodeText: {
    marginTop: '20px'
  },
  Submit: {
    width: '300px', 
    marginTop: '20px'
  },
  Loading: {
    marginTop: '15px'
  }
}

class App extends Component {
  constructor(props){
    super(props)

    this.onFetchLocations = this.onFetchLocations.bind(this)
  }

  onFetchLocations() {
    if (this.props.zipCodeVal){
      this.props.fetchLocations(this.props.zipCodeVal)
    } else {
      this.props.updateError('Zip code cannot be left blank')
    }
  }

  renderError() {
    return <p style={styles.Error}>{this.props.error}</p>
  }

  renderLoading() {
    return <p style={styles.Loading}>Loading...</p>
  }

  render() {
    return (
      <div style={styles.AppContainer}>
        <h1>DÜBER</h1>
        
        {!this.props.submitted && (
          <div>
            <p>Enter an amount you would like to spend</p>
            <div>$<CurrencyInput /></div>
          </div>
        )}
        
        <p style={styles.ZipCodeText}>Enter your zip code (Preferrably in Seattle, ex. 98106)</p>
        <ZipCodeInput />

        <button
          style={styles.Submit}
          onClick={() => this.onFetchLocations()}
        >
          Submit
        </button>
        
        {this.props.submitted && <Cart currencyVal={this.props.currencyVal} />}

        {!this.props.retailers && this.props.submitting && this.renderLoading()}
        {!this.props.retailers && this.props.error && this.renderError()}
        {this.props.retailers && (
          <RetailerList 
            retailers={this.props.retailers}
            addToCart={this.props.addToCart}
            itemIDs={this.props.itemIDs}
          />
        )}

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    zipCodeVal: state.zipCodeInput.zipCodeVal,
    currencyVal: state.currencyInput.currencyVal,
    error: state.error.message,
    retailers: state.retailer.retailers,
    itemIDs: state.cart.itemIDs,
    submitted: state.retailer.submitted,
    submitting: state.retailer.submitting
})

const mapDispatchToProps = {
  fetchLocations,
  updateError,
  addToCart
}

export default connect(mapStateToProps, mapDispatchToProps)(App);