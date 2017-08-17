import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../../actions';
import Home from '../home';
import DebtorsList from './Client/DebtorsList';

class Devedores extends Component {   
    
    componentWillMount() {
        this.props.fetchDevedores();
    }

    
    renderClientList() {
        if (!_.isEmpty(this.props.devedores)) {
            return (
                <DebtorsList clients={this.props.devedores} />
            );
        }
    }

    render() {
        return (
            <div>
                <Home />
                <div className="agenda">
                    <input className="input-agenda" placeholder="Digite sua busca" />
                    <button className="input-agenda button-agenda"> Pesquisar </button>
                    <br />
                    <hr className="hr" />
                    {this.props.message}
                    {this.renderClientList()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.auth.message,
        clients: state.clients,
        devedores: state.devedores
    };
};

export default connect(mapStateToProps, actions)(Devedores);
