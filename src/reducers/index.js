import { combineReducers } from 'redux';
import currencyInputReducer from './currencyInput'
import zipCodeInputReducer from './zipCodeInput'
import errorReducer from './error'
import retailerReducer from './retailer'
import cartReducer from './cart'

const rootReducer = combineReducers({
  currencyInput: currencyInputReducer,
  error: errorReducer,
  zipCodeInput: zipCodeInputReducer,
  retailer: retailerReducer,
  cart: cartReducer,
});

export default rootReducer;
