import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import * as actions from '../../../actions';
import Home from '../../home';
import ClientList from './ClientList';
import SearchBarAgenda from './SearchBarAgenda';

class Agenda extends Component {   
    constructor(props) {
        super(props);
        this.state = {
            filteredClients: {}
        };
    }

    componentWillMount() {
        console.log(moment().format('L'));
        this.props.fetchClientsByDate('02/11/2017');
        // this.props.fetchClients();
    }

    clientSearch(term) {
        this.props.fetchClientsByDate(term);
        this.setState({
            filteredClients: _.filter(this.props.clients, e => 
                (e.nome.toUpperCase()).startsWith(term.toUpperCase()) || 
                (e.endereco.toUpperCase()).includes(term.toUpperCase()))
        });
    }
    
    renderClientList() {
        if (!_.isEmpty(this.state.filteredClients)) {
            return (
                <ClientList clients={this.state.filteredClients} />
            );
        } else if (!_.isEmpty(this.props.clients)) {
            return (
                <ClientList clients={this.props.clients} />
            );
        }
    }

    render() {
        const clientSearch = _.debounce(term => { this.clientSearch(term); }, 1000);

        return (
            <div>
                <Home />
                <div className="agenda">
                    <SearchBarAgenda onSearchTermChange={clientSearch} text='Digite uma data para verificar a Agenda' />
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
        clients: state.clients
    };
};

export default connect(mapStateToProps, actions)(Agenda);
