import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import * as actions from '../../../actions';
import Home from '../../home';
import normalizePhone from '../../helpers/normalizePhone';
import formatDate from '../../helpers/formatDate';
import formatNumber from '../../helpers/formatNumber';

class EditClient extends Component {   

    constructor(props) {
        super(props);
        this.state = {
            nome: this.props.currentClient.nome,
            email: this.props.currentClient.email,
            endereco: this.props.currentClient.endereco,
            referencia: this.props.currentClient.referencia,
            telefone1: this.props.currentClient.telefone1,
            telefone2: this.props.currentClient.telefone2,
            observacoes: this.props.currentClient.observacoes,
            cod: this.props.currentClient.cod,
            valorVendido: this.props.currentClient.valorVendido,
            debito: this.props.currentClient.debito,
            novoCod: this.props.currentClient.novoCod,
            dataAcerto: this.props.currentClient.dataAcerto,
            valorAcertado: this.props.currentClient.valorAcertado,
            pontos: this.props.currentClient.pontos,
            dataProximoEncontro: this.props.currentClient.dataProximoEncontro,
            observacaoDia: this.props.currentClient.observacaoDia,
            semContato: this.props.currentClient.semContato,
            inativo: this.props.currentClient.inativo,
            dataInicio: this.props.currentClient.dataInicio,
            indicacao: this.props.currentClient.indicacao,
            _id: this.props.currentClient._id
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        if (name === 'dataProximoEncontro' || name === 'dataAcerto' || name === 'dataInicio') {
            value = formatDate(value);
        }
        if (name === 'valorVendido' || name === 'debito' || name === 'valorAcertado' || name === 'pontos') {
            value = formatNumber(value);
        }
        if (name === 'telefone1' || name === 'telefone2') {
            value = normalizePhone(value);
        }
        this.setState({
            [name]: value
        });
        console.log(this.state);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.editClient(this.state);
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
        const clientId = this.props.params['_id'];
        const client = this.props.clients[clientId];
        return (
            <div>
                <Home />
                <div className="cadastro agenda">
                    <form onSubmit={this.handleSubmit}>
                        <fieldset className="form-group">
                            <input
                                onChange={this.handleChange}
                                value={this.state.nome}
                                className="input-agenda"
                                label="Nome"
                                name="nome"
                                defaultValue={client.nome}
                                placeholder='Nome completo'
                                type="text"
                            />
                        </fieldset>
                        <fieldset className="form-group">
                            <input
                                onChange={this.handleChange}
                                value={this.state.email}
                                className="input-agenda"
                                label="Email"
                                name="email"
                                defaultValue={client.email}
                                placeholder='Email'
                                type="email"
                            />
                        </fieldset>
                        <fieldset className="form-group">
                            <input
                                onChange={this.handleChange}
                                value={this.state.endereco}
                                className="input-agenda"
                                label="Endereço"
                                name="endereco"
                                defaultValue={client.endereco}
                                placeholder='Endereço' 
                                type="text"
                            />
                        </fieldset>
                        <fieldset className="form-group">
                            <input
                                onChange={this.handleChange}
                                value={this.state.referencia}
                                className="input-agenda"
                                label="Referência"
                                name="referencia"
                                defaultValue={client.referencia}
                                placeholder='Referência' 
                                type="text"
                            />
                        </fieldset>
                        <fieldset>
                            <input
                                onChange={this.handleChange}
                                value={this.state.telefone1}
                                className="input-agenda"
                                name="telefone1"
                                defaultValue={client.telefone1}
                                placeholder='Telefone'
                                type="text"
                                label="Telefone"
                                normalize={normalizePhone}
                            />
                        </fieldset>
                        <fieldset>
                            <input
                                onChange={this.handleChange}
                                value={this.state.telefone2}
                                className="input-agenda"
                                name="telefone2"
                                defaultValue={client.telefone2}
                                placeholder='Telefone'
                                type="text"
                                label="Telefone"
                                normalize={normalizePhone}
                            />
                        </fieldset>
                        <fieldset className="form-group">
                            <input
                                onChange={this.handleChange}
                                value={this.state.observacoes}
                                className="input-agenda"
                                label="Observações"
                                name="observacoes"
                                defaultValue={client.observacoes}
                                placeholder='Observações' 
                                type="text"
                            />
                        </fieldset>
                        <fieldset className="form-group">
                            <input
                                onChange={this.handleChange}
                                value={this.state.cod}
                                className="input-agenda"
                                label="Cod/Mostruario"
                                name="cod"
                                defaultValue={client.cod}
                                placeholder='Cod/Mostruário'
                                type="text"
                            />
                        </fieldset>
                        <fieldset className="form-group">
                            <input
                                onChange={this.handleChange}
                                value={this.state.valorVendido}
                                className="input-agenda"
                                label="Valor vendido"
                                name="valorVendido"
                                defaultValue={client.valorVendido}
                                placeholder='Valor vendido'
                                type="text"
                            />
                        </fieldset>
                        <fieldset className="form-group">
                            <input
                                onChange={this.handleChange}
                                value={this.state.debito}
                                className="input-agenda"
                                label="Débito"
                                name="debito"
                                defaultValue={client.debito}
                                placeholder='Débito'
                                type="text"
                            />
                        </fieldset>
                        <fieldset className="form-group">
                            <input
                                onChange={this.handleChange}
                                value={this.state.novoCod}
                                className="input-agenda"
                                label="novoCod"
                                name="novoCod"
                                defaultValue={client.novoCod}
                                placeholder='Cod/Mostruário'
                                type="text"
                            />
                        </fieldset>
                        <fieldset className="form-group">
                            <input
                                onChange={this.handleChange}
                                value={this.state.dataProximoAcerto}
                                className="input-agenda"
                                label="Data do último Acerto"
                                name="dataAcerto"
                                defaultValue={client.dataAcerto}
                                placeholder='Data do último acerto'
                                type="text"
                            />
                        </fieldset>
                        <fieldset className="form-group">
                            <input
                                onChange={this.handleChange}
                                value={this.state.valorAcertado}
                                className="input-agenda"
                                label="Valor Acertado"
                                name="valorAcertado"
                                defaultValue={client.valorAcertado}
                                placeholder='Valor acertado' 
                                type="text"
                            />
                        </fieldset>
                        <fieldset className="form-group">
                            <input
                                onChange={this.handleChange}
                                value={this.state.pontos}
                                className="input-agenda"
                                label="Pontos"
                                name="pontos"
                                defaultValue={client.pontos}
                                placeholder='Pontos'
                                type="text"
                            />
                        </fieldset>
                        <fieldset className="form-group">
                            <input
                                onChange={this.handleChange}
                                value={this.state.dataProximoEncontro}
                                className="input-agenda"
                                label="Data do Proximo Encontro"
                                name="dataProximoEncontro"
                                defaultValue={client.dataProximoEncontro}
                                placeholder='Data do próximo encontro' 
                                type="text"
                            />
                        </fieldset>
                        <fieldset className="form-group">
                            <input
                                onChange={this.handleChange}
                                value={this.state.observacaoDia}
                                className="input-agenda"
                                label="Observação do dia"
                                name="observacaoDia"
                                defaultValue={client.observacaoDia}
                                placeholder='Observação do dia'
                                type="text"
                            />
                        </fieldset>
                        <fieldset className="form-group">
                            <input
                                onChange={this.handleChange}
                                value={this.state._id}
                                className="no-display"
                                label="Id"
                                name="_id"
                                defaultValue={client._id}
                                type="text"
                            />
                        </fieldset>
                        <fieldset className="form-group">
                            <input
                                onChange={this.handleChange}
                                value={this.state.dataInicio}
                                className="input-agenda"
                                label='dataInicio'
                                name='dataInicio'
                                placeholder='Data Início'
                                defaultValue={client.dataInicio}
                                type="text"
                            />
                        </fieldset>
                        <fieldset className="form-group">
                            <input
                                onChange={this.handleChange}
                                value={this.state.indicacao}
                                className='input-agenda'
                                label='indicacao'
                                name='indicacao'
                                placeholder='Indicação'
                                defaultValue={client.indicacao}
                                type="text"
                            />
                        </fieldset>
                        <div className="checkboxes">
                            <fieldset className="form-group">
                                <input
                                    onChange={this.handleChange}
                                    value={this.state.semContato}
                                    defaultValue={client.semContato}
                                    label="Sem contato"
                                    name="semContato"
                                    type="checkbox"
                                />
                                <span className="checkboxtext">Sem contato</span>
                            </fieldset>
                            <fieldset>
                                <input
                                    onChange={this.handleChange}
                                    value={this.state.inativo}
                                    defaultValue={client.inativo}
                                    label="Inativo"
                                    name="inativo"
                                    type="checkbox"
                                />
                                <span className="checkboxtext">Inativo</span>
                            </fieldset>
                        </div>
                        <br />
                        <hr className="hr" />
                        {this.renderAlert()}
                            <button type="submit" className="input-agenda button-agenda">Salvar alterações</button>
                        <Link to={`/client/${client._id}`}>
                            <button className="input-agenda button-agenda">Voltar</button>
                        </Link> 
                    </form>
                </div>

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
        clients: state.clients,
        currentClient: state.currentClient.client
    };
};

export default reduxForm({
    form: 'editClient',
    validate    
})(
    connect(mapStateToProps, actions)(EditClient)
);

