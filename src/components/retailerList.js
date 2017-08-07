import React from 'react'
import Cart from './cart'

const styles = {
    RetailerList: {
        border: '1px solid lightgray', 
        padding: '15px', 
        marginBottom: '10px'
    },
    Image: {
        height: '150px', 
        width: '150px'
    },
    RetailerName: {
        marginTop: '10px'
    },
    RetailerListContainer: {
        marginTop: '30px'
    },
    ProductContainer: {
        cursor: 'pointer'
    }
}

const RetailerList = (props) => {
    const arrayMax = (array) => array.reduce((a,b) => Math.max(a, b))
    const arrayMin = (array) => array.reduce((a,b) => Math.min(a, b))
    return (
        <div>
            <div style={styles.RetailerListContainer}>
                {props.retailers.map((retailer) => {
                    return (
                        <div style={styles.RetailerList}>
                            <img style={styles.Image} src={retailer.picture} />
                            <h2 style={styles.RetailerName}>{retailer.name}</h2>
                            <span style={{fontSize: '11px'}}>{Math.round(retailer.distance)} miles away</span>
                            {retailer.products.map((product) => {
                                const ProductPriceStyles = {fontSize: '15px', color: props.itemIDs.includes(product.id) ? 'dodgerblue' : 'black'}
                                const ProductNameStyles = {fontSize: '12px', color: props.itemIDs.includes(product.id) ? 'dodgerblue' : 'black'}
                                const THCStyles = {fontSize: '12px', color: props.itemIDs.includes(product.id) ? 'dodgerblue' : 'green'}
                                return (
                                    <div onClick={() => props.addToCart({product, retailerName: retailer.name})} style={styles.ProductContainer}>
                                        <p>
                                            <span style={ProductPriceStyles}>{`$${product.price} - `}</span>
                                            <span style={ProductNameStyles}>{product.name} </span>
                                            <span style={THCStyles}>{product.thc_range.length === 1 ? `(THC: ${product.thc_range[0]})` : `(THC: ${arrayMin(product.thc_range)} - ${arrayMax(product.thc_range)})`}</span>
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default RetailerList