import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import Home from '../../home';
import AcertoDetails from './AcertoDetails';

class AcertoSingle extends Component {   

    render() {
        const AcertoId = this.props.params['_id'];
        const acerto = this.props.acertos[AcertoId];
        this.props.setAcerto(acerto);
        
        return (
            <div>
                <Home />
                 <AcertoDetails acerto={acerto} /> 
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        acertos: state.acertos
    };
};

export default connect(mapStateToProps, actions)(AcertoSingle);
