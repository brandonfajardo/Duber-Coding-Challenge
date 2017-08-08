import { ADD_TO_CART, REMOVE_FROM_CART, BUY_CART_ITEMS, TOGGLE_SUCCESS } from '../actions'

const initialState = {
    cartItems: [],
    itemIDs: [],
    successMessage: '',
}

const cart = (state = initialState, action) => {
    switch(action.type){
        case ADD_TO_CART:
            return {
                ...state,
                cartItems: [...state.cartItems].concat({
                    id: action.item.product.id,
                    name: action.item.product.name,
                    thc: action.item.product.thc_range,
                    price: action.item.product.price,
                    retailerName: action.item.retailerName
                }),
                itemIDs: [...state.itemIDs].concat(action.item.product.id)
            }
        case REMOVE_FROM_CART:
            const updatedCartItems = state.cartItems.filter((item) => {
                if (item.id === action.item.id){
                    return false
                } else {
                    return item
                }
            })

            const updatedItemIDs = state.itemIDs.filter((id) => {
                if (id === action.item.id){
                    return false
                } else {
                    return id
                }
            })
            
            return {
                cartItems: updatedCartItems,
                itemIDs: updatedItemIDs,
            }
        case BUY_CART_ITEMS:
            return {
                ...state,
                cartItems: [],
                itemIDs: [],
                successMessage: "You have successfully made your purchase."
            }
        case TOGGLE_SUCCESS: 
            return {
                ...state,
                successMessage: null
            }
        default:
            return state
    }
}

export default cart