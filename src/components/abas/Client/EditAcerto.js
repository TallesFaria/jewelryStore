import { connect } from 'react-redux';
import { Link } from 'react-router';
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../../actions';
import formatDate from '../../helpers/formatDate';
import formatNumber from '../../helpers/formatNumber';

class EditAcerto extends Component {   

    constructor(props) {
        super(props);
        this.state = {
            cod: this.props.currentAcerto.cod,
            dataAcerto: this.props.currentAcerto.dataAcerto,
            acerto: this.props.currentAcerto.acerto,
            venda: this.props.currentAcerto.venda,
            novoCod: this.props.currentAcerto.novoCod,
            proximoEncontro: this.props.currentAcerto.proximoEncontro,
            clientId: this.props.currentAcerto.clientId,
            _id: this.props.currentAcerto._id
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        if (name === 'proximoEncontro' || name === 'dataAcerto') {
            value = formatDate(value);
        }
        if (name === 'venda' || name === 'acerto') {
            value = formatNumber(value);
        }
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        console.log(this.state);
        event.preventDefault();
        this.props.editAcerto(this.state);
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
        return (
            <div className="agenda">
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
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
                    <fieldset>
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
                    <fieldset >
                        <input
                            onChange={this.handleChange}
                            className='input-agenda'
                            value={this.state.acerto}
                            placeholder='Valor Acerto'
                            label="Acerto"
                            name="acerto"
                            type="text"
                        />
                    </fieldset>
                    <fieldset >
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
                    <fieldset >
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
                    <fieldset >
                        <input
                            onChange={this.handleChange}
                            className='input-agenda'
                            value={this.state.proximoEncontro}
                            placeholder='Data do Próximo Encontro'
                            label="Próxima Data"
                            name="proximoEncontro"
                            type="text"
                        />
                    </fieldset>
                    <fieldset >
                        <input
                            onChange={this.handleChange}
                            className='input-agenda'
                            value={this.state.clientId}
                            className="no-display"
                            label="Client Id"
                            name="clientId"
                            defaultValue={this.state.clientId}
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
        errorMessage: state.auth.error,
        currentAcerto: state.currentAcerto.acerto
    };
};

export default reduxForm({
    form: 'EditAcerto',
    validate    
})(
    connect(mapStateToProps, actions)(EditAcerto)
);
