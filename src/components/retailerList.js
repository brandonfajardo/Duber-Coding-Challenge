import React from 'react'

const RetailerList = (props) => {
    return (
        <div style={{marginTop: '30px'}}>
            {props.retailers.map((retailer) => {
                return (
                    <div style={{border: '1px solid lightgray', padding: '15px', marginBottom: '10px'}}>
                        <img style={{height: '150px', width: '150px'}} src={retailer.picture} />
                        <h2 style={{marginTop: '10px'}}>{retailer.name}</h2>
                        {retailer.products.map((product) => {
                            return (
                                <div style={{fontSize: '12px'}}>
                                    <p style={{cursor: 'pointer'}}>{`$${product.price} - ${product.name}`}</p>
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}

export default RetailerList