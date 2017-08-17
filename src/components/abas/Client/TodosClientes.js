import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import * as actions from '../../../actions';
import Home from '../../home';
import ClientList from './ClientList';
import SearchBar from './SearchBar';

class TodosClientes extends Component {   
    constructor(props) {
        super(props);
        this.state = {
            filteredClients: {}
        };
    }

    componentWillMount() {
        this.props.fetchClients();
    }

    clientSearch(term) {
        if (term.toUpperCase() === 'INATIVOS') {
            console.log('ESTOU AQUI');
            console.log(_.filter(this.props.clients, e => {
                console.log(e.inativo);
                return e.inativo;
            }));
            this.setState({
                filteredClients: _.filter(this.props.clients, e => e.inativo)
            });
        } else if (term.toUpperCase() === 'SEM CONTATO') {
            this.setState({
                filteredClients: _.filter(this.props.clients, e => e.semContato)
            });
        } else {
            this.setState({
            filteredClients: _.filter(this.props.clients, e => 
                (e.nome.toUpperCase()).startsWith(term.toUpperCase()) || 
                (e.endereco.toUpperCase()).includes(term.toUpperCase()))
            });
        }
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
        const clientSearch = _.debounce(term => { this.clientSearch(term); }, 300);

        return (
            <div>
                <Home />
                <div className="agenda">
                    <SearchBar onSearchTermChange={clientSearch} />
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

export default connect(mapStateToProps, actions)(TodosClientes);
