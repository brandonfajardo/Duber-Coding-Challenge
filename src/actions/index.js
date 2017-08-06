export const CHANGE_CURRENCY = 'CHANGE_CURRENCY'
export const CHANGE_ZIP_CODE = 'CHANGE_ZIP_CODE'
export const SET_LOCATIONS = 'SET_LOCATIONS'
export const SET_RETAILERS = 'SET_RETAILERS'
export const UPDATE_ERROR = 'UPDATE_ERROR'

export const changeCurrency = item => ({ type: CHANGE_CURRENCY, item })
export const changeZipCode = item => ({ type: CHANGE_ZIP_CODE, item })
export const updateError = item => ({ type: UPDATE_ERROR, item })

// Thunks
import axios from 'axios'

export const fetchLocations = (x) => {
    return (dispatch) => {
        Promise.all(
            [
                axios.get('https://admin.duberex.com/products/geo_search.json?gps[]=47.2612&gps[]=-121.4174952&searchText=flower'),
                axios.get('https://admin.duberex.com/products/geo_search.json?gps[]=47.2612&gps[]=-121.4174952&searchText=pre-roll')
            ]
        )
        .then((results) => {
           const flowerRetailersWithin100M = results[0].data.filter((retailer) => {
                if (retailer.distance < 100 && retailer.products.length >= 3){
                    return retailer
                } else {
                    return false
                }
            })

            const preRollRetailersWithin100M = results[1].data.filter((retailer) => {
                if (retailer.distance < 100 && retailer.products.length >= 3){
                    return retailer
                } else {
                    return false
                }
            })

            return flowerRetailersWithin100M.concat(preRollRetailersWithin100M)
        })
        .then((retailers) => {
            dispatch({ type: SET_RETAILERS, item: retailers })
        })
    }
}

