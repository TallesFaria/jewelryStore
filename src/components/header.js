import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../actions';

class Header extends Component {
    renderLinks() {
        if (this.props.authenticated) {
            return (
                <Link to="/signout" className="navbar-brand"><h2>Sign Out</h2></Link>
            );
        }
        return [
            <div key={1}>
                <Link to="/signin" className="navbar-brand"><h2>Sign In</h2></Link>
            </div>,
            <div key={2}>
                <Link to="/signup" className="navbar-brand"><h2>Sign Up</h2></Link>
            </div>
        ];
    }
    
    render() {
        return (
            <nav className="navs">
                <Link to="/" className="navbar-brand"><h2>Início</h2></Link>
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

export default connect(mapStateToProps, actions)(Header);
