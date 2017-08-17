import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions/client';
import Home from '../../home';
import ClientOperations from './ClientOperations';
import Details from './Details';
import DetailsCheckbox from './DetailsCheckbox';
import NovoAcerto from './NovoAcerto';


class Single extends Component {   

    render() {
        const clientId = this.props.params['_id'];
        const client = this.props.clients[clientId];
        this.props.setClient(client);
        
        return (
            <div>
                <Home />
                <ClientOperations client={client} />
                <NovoAcerto client={client} />
                <div className="agenda">
                    <DetailsCheckbox client={client} />
                    <Details client={client} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        clients: state.clients
    };
};

export default connect(mapStateToProps, actions)(Single);
