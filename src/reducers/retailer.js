import { SET_RETAILERS, SUBMITTING, CLEAR_RETAILER_LIST, UPDATE_ERROR } from '../actions'

const initialState = {
    retailers: null,
    submitted: false,
    submitting: false
}

const retailer = (state = initialState, action) => {
    switch(action.type){
        case SUBMITTING: 
            return {
                ...state,
                submitting: true
            }
        case SET_RETAILERS: 
            return {
                ...state,
                retailers: action.item,
                submitted: true
            }
        case CLEAR_RETAILER_LIST: 
            return {
                ...state,
                retailers: null
            }
        case UPDATE_ERROR: 
            return {
                ...state,
                submitting: false
            }
        default:
            return state
    }
}

export default retailer