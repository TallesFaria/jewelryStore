import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../actions';
import AgendaDia from './abas/Client/AgendaDia';

class Welcome extends Component {
    renderLinks() {
        if (this.props.authenticated) {
            return (
                <AgendaDia />
            );
        }
        return [
            <div>
                <div className="pagina-inicial">
                    <span>Por favor, faça login!</span>
                </div>
            </div>
        ];
    }
    
    render() {
        return (
            <div>
                {this.renderLinks()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.auth.authenticated
    };
};

export default connect(mapStateToProps, actions)(Welcome);