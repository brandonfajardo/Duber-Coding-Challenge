import { UPDATE_ERROR, SET_LOCATIONS, SET_RETAILERS, BUY_CART_ITEMS, SUBMITTING } from '../actions'

const initialState = {
    message: null
}

const error = (state = initialState, action) => {
    switch(action.type){
        case SUBMITTING:
            return {
                message: null
            }
        case SET_RETAILERS: 
            return {
                message: null,
            }
        case SET_LOCATIONS: 
            return {
                message: null,
            }
        case UPDATE_ERROR:
            return {
                message: action.item
            }
        case BUY_CART_ITEMS: 
            return {
                message: null,
            }
        default:
            return state
    }
}

export default error