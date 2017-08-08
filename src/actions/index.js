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

export const fetchLocations = (zipCode) => {
    return (dispatch) => {
        dispatch({ type: CLEAR_RETAILER_LIST })
        dispatch({ type: SUBMITTING })
        axios.get(`http://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}`)
            .then((res) => {
                let lat;
                let lng;

                if (res.data.results.length === 0){
                    dispatch({ type: UPDATE_ERROR, item: "Zip code does not exist."})
                } else {
                    return {
                        lat: res.data.results[0].geometry.location.lat,
                        lng: res.data.results[0].geometry.location.lng
                    }
                }
            })
            .then((location) => {
                if (location){
                    Promise.all(
                    [
                        axios.get(`https://admin.duberex.com/products/geo_search.json?gps[]=${location.lat}&gps[]=${location.lng}&searchText=flower`),
                        axios.get(`https://admin.duberex.com/products/geo_search.json?gps[]=${location.lat}&gps[]=${location.lng}&searchText=pre-roll`)
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

                    if (flowerRetailersWithin100M.length === 0 && preRollRetailersWithin100M.length === 0){
                        dispatch({ type: UPDATE_ERROR, item: "No retailers within 100 miles of specified zip code."})
                    } else {
                        return _.uniq(flowerRetailersWithin100M.concat(preRollRetailersWithin100M), (retailer) => {
                            return retailer.name
                        })
                    }
                })
                .then((retailers) => {
                    if (retailers){
                        dispatch({ type: SET_RETAILERS, item: retailers })
                    }
                })
            }
        })
    }
}

