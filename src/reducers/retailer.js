import { SET_RETAILERS } from '../actions'

const initialState = {
    retailers: null
}

const retailer = (state = initialState, action) => {
    switch(action.type){
        case SET_RETAILERS: 
            return {
                ...state,
                retailers: action.item
            }
        default:
            return state
    }
}

export default retailer