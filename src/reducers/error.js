import { UPDATE_ERROR, SET_LOCATIONS } from '../actions'

const initialState = {
    message: null
}

const error = (state = initialState, action) => {
    switch(action.type){
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
        default:
            return state
    }
}

export default error