import React, { Component } from 'react';
import { connect } from 'react-redux';
import formatDate from '../helpers/formatDate';
import * as actions from '../../actions';

class FormReports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataAcerto: '',
            proximoEncontro: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(target) {
        const name = target.name;
        this.setState({
            [name]: formatDate(target.value)
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.getReports(this.state);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <input 
                            className="input-agenda" 
                            placeholder='Selecione uma data início para a avaliação'
                            name="dataAcerto"
                            value={this.state.dataAcerto}
                            onChange={event => this.handleChange(event.target)} 
                        />
                    </fieldset>
                    <fieldset>
                        <input
                            className='input-agenda'
                            placeholder='Selecione uma data final para a avaliação'
                            name="proximoEncontro"
                            value={this.state.proximoEncontro}
                            onChange={event => this.handleChange(event.target)} 
                        />
                    </fieldset>
                    <button 
                        type="submit" 
                        className="input-agenda button-agenda"
                    >
                        Gerar relatórios
                    </button>
                </ form>
            </ div>
        );  
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.auth.message
    };
};

export default connect(mapStateToProps, actions)(FormReports);

