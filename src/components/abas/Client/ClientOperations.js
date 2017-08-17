import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../../../actions';

class ClientOperations extends Component {   

    render() {
        const client = this.props.currentClient;
        const id = client._id;
        return (
            <div className="client-operations">
                <Link className="client-operation" to={`/acerto/${id}`} > Novo Acerto e Detalhes </Link>
                <Link className="client-operation" to={`/map/${id}`} > Localização </Link>
                <Link className="client-operation" to={`/data/${id}`} > Histórico e Acertos </Link>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.auth.message,
        currentClient: state.currentClient.client
    };
};

export default connect(mapStateToProps, actions)(ClientOperations);
