import React from 'react';
import { connect } from 'react-redux'
import { changeZipCode } from '../actions'

const zipCodeInput = (props) => {
    return (
        <div>
            <input
                value={props.zipCodeVal} 
                onChange={(e) => props.changeZipCode(e.target.value)}
            />
        </div>
    )
}

const mapStateToProps = (state) => ({
    zipCodeVal: state.zipCodeInput.zipCodeVal,
})

const mapDispatchToProps = {
    changeZipCode
}

export default connect(mapStateToProps, mapDispatchToProps)(zipCodeInput);