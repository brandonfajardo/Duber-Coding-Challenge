import { CHANGE_ZIP_CODE } from '../actions'

const initialState = {
    zipCodeVal: null
}

const currencyInput = (state = initialState, action) => {
    switch(action.type){
        case CHANGE_ZIP_CODE:
            return {
                ...state,
                zipCodeVal: action.item
            }
        default:
            return state
    }
}

export default currencyInput