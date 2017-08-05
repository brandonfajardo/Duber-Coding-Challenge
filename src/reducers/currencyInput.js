import { CHANGE_CURRENCY } from '../actions'

const initialState = {
    currencyVal: '50.00'
}

const currencyInput = (state = initialState, action) => {
    switch(action.type){
        case CHANGE_CURRENCY:
            return {
                ...state,
                currencyVal: action.item
            }
        default:
            return state
    }
}

export default currencyInput