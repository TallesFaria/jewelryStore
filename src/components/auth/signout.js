import React, { Component } from 'react';
import { connect } from 'react-redux';       
import * as actions from '../../actions';

class Signout extends Component {
    
    componentWillMount() {
        this.props.signoutUser();
    }
    

    render() {
        return (
            <div className="Agenda">
                <h1>
                    Tenha um bom dia! 
                </h1>    
            </div>
        );
    }
}

export default connect(null, actions)(Signout);
