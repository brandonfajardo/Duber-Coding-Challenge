import { combineReducers } from 'redux';
import currencyInputReducer from './currencyInput'
import zipCodeInputReducer from './zipCodeInput'

const rootReducer = combineReducers({
  currencyInput: currencyInputReducer,
  zipCodeInput: zipCodeInputReducer,
});

export default rootReducer;
