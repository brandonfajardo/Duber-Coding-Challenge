import { combineReducers } from 'redux';
import currencyInputReducer from './currencyInput'
import zipCodeInputReducer from './zipCodeInput'
import errorReducer from './error'
import retailerReducer from './retailer'

const rootReducer = combineReducers({
  currencyInput: currencyInputReducer,
  error: errorReducer,
  zipCodeInput: zipCodeInputReducer,
  retailer: retailerReducer,
});

export default rootReducer;
