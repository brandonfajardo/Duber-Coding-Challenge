export const CHANGE_CURRENCY = 'CHANGE_CURRENCY'
export const CHANGE_ZIP_CODE = 'CHANGE_ZIP_CODE'
export const SET_LOCATIONS = 'SET_LOCATIONS'
export const SET_RETAILERS = 'SET_RETAILERS'
export const UPDATE_ERROR = 'UPDATE_ERROR'
export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const BUY_CART_ITEMS = 'BUY_CART_ITEMS'
export const SUBMITTING = 'SUBMITTING'
export const CLEAR_RETAILER_LIST = 'CLEAR_RETAILER_LIST'
export const TOGGLE_SUCCESS = 'TOGGLE_SUCCESS'

export const buyCartItems = () => ({ type: BUY_CART_ITEMS })
export const changeCurrency = item => ({ type: CHANGE_CURRENCY, item })
export const changeZipCode = item => ({ type: CHANGE_ZIP_CODE, item })
export const updateError = item => ({ type: UPDATE_ERROR, item })
export const addToCart = item => ({ type: ADD_TO_CART, item })
export const removeFromCart = item => ({ type: REMOVE_FROM_CART, item })
export const toggleSuccess = () => ({ type: TOGGLE_SUCCESS })

// Thunks
import axios from 'axios'
import _ from 'lodash'

export const fetchLocations = (x) => {
    return (dispatch) => {
        dispatch({ type: CLEAR_RETAILER_LIST })
        dispatch({ type: SUBMITTING })
        Promise.all(
            [
                axios.get('https://admin.duberex.com/products/geo_search.json?gps[]=47.2612&gps[]=-121.4174952&searchText=flower'),
                axios.get('https://admin.duberex.com/products/geo_search.json?gps[]=47.2612&gps[]=-121.4174952&searchText=pre-roll')
            ]
        )
        .then((results) => {
           const flowerRetailersWithin100M = results[0].data.filter((retailer) => {
                if (retailer.distance <= 100 && retailer.products.length >= 3){
                    return retailer
                } else {
                    return false
                }
            })

            const preRollRetailersWithin100M = results[1].data.filter((retailer) => {
                if (retailer.distance <= 100 && retailer.products.length >= 3){
                    return retailer
                } else {
                    return false
                }
            })

            return _.uniq(flowerRetailersWithin100M.concat(preRollRetailersWithin100M), (retailer) => {
                return retailer.name
            })
        })
        .then((retailers) => {
            dispatch({ type: SET_RETAILERS, item: retailers })
        })
    }
}

