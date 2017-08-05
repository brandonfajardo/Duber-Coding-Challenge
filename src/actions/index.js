export const CHANGE_CURRENCY = 'CHANGE_CURRENCY'
export const CHANGE_ZIP_CODE = 'CHANGE_ZIP_CODE'

export const changeCurrency = item => ({ type: CHANGE_CURRENCY, item })
export const changeZipCode = item => ({ type: CHANGE_ZIP_CODE, item })