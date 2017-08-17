import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../../../actions';
import AcertosList from './AcertosList';
import Home from '../../home';
import ClientOperations from './ClientOperations';

class Historico extends Component {   
    
    componentWillMount() {
        this.props.fetchAcertos(this.props.currentClient._id);
    }

    
    renderAcertosList() {
        if (!_.isEmpty(this.props.acertos)) {
            return (
                <AcertosList acertos={this.props.acertos} />
            );
        }
    }

    render() {
        return (
            <div>
                <Home />
                <ClientOperations />
                <div className="agenda">
                    <input className="input-agenda" placeholder="Digite sua busca" />
                    <button className="input-agenda button-agenda"> Pesquisar </button>
                    <br />
                    <hr className="hr" />
                    {this.props.message}
                    {this.renderAcertosList()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.auth.message,
        acertos: state.acertos,
        currentClient: state.currentClient.client
    };
};

export default connect(mapStateToProps, actions)(Historico);
