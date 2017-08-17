import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Feature extends Component {   
    
    componentWillMount() {
        this.props.fetchMessage()
    }
    
    render(){
        return(
            <div>
                {this.props.message}
                This is protected!!! Gurl, dont!!
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        message: state.auth.message
    }
}

export default connect(mapStateToProps, actions)(Feature)