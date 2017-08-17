import { connect } from 'react-redux';
import { Link } from 'react-router';
import moment from 'moment';
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../../actions';

class NovoAcerto extends Component {   

    constructor(props) {
        super(props);
        this.state = {
            cod: '',
            dataAcerto: moment().locale('pt-br').format('L'),
            acerto: '',
            venda: '',
            novoCod: '',
            proximoEncontro: '',
            clientId: this.props.client._id
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    formatDate(input) {
        let date = input;
        if (!date) return date;
        date = date.replace(/[^0-9]+/g, '');
        if (date.length > 2) {
            date = `${date.substring(0, 2)}/${date.substring(2)}`;
        }
        if (date.length > 5) {
            date = `${date.substring(0, 5)}/${date.substring(5, 9)}`;
        }
        return date;
    }

    formatNumber(input) {
        let number = input;
        if (!number) return number;
        number = number.replace(/[^0-9]+/g, '');
        if (number.length > 2) {
            number = `${number.substring(0, number.length - 2)}.${number.substring(number.length - 2)}`;
        }
        return number;
    }

    handleChange(event) {
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        console.log(name);
        if (name === 'proximoEncontro' || name === 'dataAcerto') {
            value = this.formatDate(value);
        }
        if (name === 'acerto' || name === 'venda') {
            value = this.formatNumber(value);
        }
        this.setState({
            [name]: value
        });
        console.log(this.state);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.addAcerto(this.state);
    }
    
    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong>
                    {this.props.errorMessage}
                </div>
            );
        }
    }

    render() {
        const client = this.props.client;
        
        return (
            <div className="agenda">
                <form onSubmit={this.handleSubmit}>
                    <fieldset className='form-group'>
                        <input
                            onChange={this.handleChange}
                            className='input-agenda'
                            value={this.state.cod}
                            placeholder='Cod/Mostruário'
                            label="Cod/Mostruário"
                            name="cod"
                            type="text"
                        />
                    </fieldset>
                    <fieldset className='form-group'>
                        <input
                            onChange={this.handleChange}
                            className='input-agenda'
                            value={this.state.dataAcerto}
                            placeholder='Data Acerto'
                            label="Data Acerto"
                            name="dataAcerto"
                            type="text"
                        />
                    </fieldset>
                    <fieldset className='form-group'>
                        <input
                            onChange={this.handleChange}
                            className='input-agenda'
                            placeholder='Valor Acerto'
                            label="Acerto"
                            value={this.state.acerto}
                            name="acerto"
                            type="text"
                        />
                    </fieldset>
                    <fieldset className='form-group'>
                        <input
                            onChange={this.handleChange}
                            className='input-agenda'
                            value={this.state.venda}
                            placeholder='Venda'
                            label="Venda"
                            name="venda"
                            type="text"
                        />
                    </fieldset>
                    <fieldset className='form-group'>
                        <input
                            onChange={this.handleChange}
                            className='input-agenda'
                            value={this.state.novoCod}
                            placeholder='Novo Cod/Mostruário'
                            name="novoCod"
                            type="text"
                            label="Proxímo Mostruário"
                        />
                    </fieldset>
                    <fieldset className='form-group'>
                        <input
                            onChange={this.handleChange}
                            className='input-agenda'
                            placeholder='Data do Próximo Encontro'
                            label="Próxima Data"
                            value={this.state.proximoEncontro}
                            name="proximoEncontro"
                            type="text"
                        />
                    </fieldset>
                    <fieldset className='form-group'>
                        <input
                            onChange={this.handleChange}
                            className='input-agenda'
                            value={this.state.clientId}
                            className="no-display"
                            label="Client Id"
                            name="clientId"
                            defaultValue={client._id}
                            type="text"
                        />
                    </fieldset>                    
                    {this.renderAlert()}
                    <button type="submit" className="input-agenda button-agenda">Salvar</button>
                    <Link to={'/agenda'}>
                        <button className="input-agenda button-agenda">Voltar</button>
                    </Link>
                </form>
            </div>
        );
    }
}

const validate = values => {
  const errors = {};
  if (!values.nome) {
    errors.nome = 'Required';
  } 
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
};

const mapStateToProps = (state) => {
    return {
        errorMessage: state.auth.error
    };
};

export default reduxForm({
    form: 'novoAcerto',
    validate    
})(
    connect(mapStateToProps, actions)(NovoAcerto)
);
