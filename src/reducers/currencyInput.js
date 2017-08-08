import { CHANGE_CURRENCY, ADD_TO_CART, REMOVE_FROM_CART } from '../actions'

const initialState = {
    currencyVal: 50.00
}

const currencyInput = (state = initialState, action) => {
    switch(action.type){
        case REMOVE_FROM_CART:
            return {
                currencyVal: state.currencyVal + action.item.price
            }
        case ADD_TO_CART:
            return {
                currencyVal: state.currencyVal - action.item.product.price
            }
        case CHANGE_CURRENCY:
            return {
                currencyVal: action.item
            }
        default:
            return state
    }
}

export default currencyInput