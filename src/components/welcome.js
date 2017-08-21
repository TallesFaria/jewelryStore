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
            <nav className="navs">
                <Link to="/inicio" className="navbar-brand"><h2>Início</h2></Link>
                <ul>
                    {this.renderLinks()}
                </ul>
            </nav>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.auth.authenticated
    };
};

export default connect(mapStateToProps, actions)(Welcome);