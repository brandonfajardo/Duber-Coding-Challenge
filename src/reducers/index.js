import { combineReducers } from 'redux';
import currencyInputReducer from './currencyInput'

const rootReducer = combineReducers({
  currencyInput: currencyInputReducer,
});

export default rootReducer;
