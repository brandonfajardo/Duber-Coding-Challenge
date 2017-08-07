import { UPDATE_ERROR, SET_LOCATIONS, SET_RETAILERS, BUY_CART_ITEMS, SUBMITTING } from '../actions'

const initialState = {
    message: null
}

const error = (state = initialState, action) => {
    switch(action.type){
        case SUBMITTING:
            return {
                ...state,
                message: null
            }
        case SET_RETAILERS: 
            return {
                ...state,
                message: null,
            }
        case SET_LOCATIONS: 
            return {
                ...state,
                message: null,
            }
        case UPDATE_ERROR:
            return {
                ...state,
                message: action.item
            }
        case BUY_CART_ITEMS: 
            return {
                ...state,
                message: null,
            }
        default:
            return state
    }
}

export default error