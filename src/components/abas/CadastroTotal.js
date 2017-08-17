import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import Home from '../home';
import normalizePhone from '../helpers/normalizePhone';

class CadastroTotal extends Component {   
    
    // componentWillMount() {
    //     this.props.fetchMessage()
    // }

    handleFormSubmit(formProps) {
        console.log(formProps);
        this.props.addClient(formProps);
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
        const { handleSubmit } = this.props;
        return (
            <div>
                <Home />
                <div className="cadastro agenda">
                    <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                        <fieldset className="form-group">
                            <Field
                                label="Nome"
                                name="nome"
                                component={renderField}
                                type="text"
                            />
                        </fieldset>
                        <fieldset className="form-group">
                            <Field
                                className="form-control"
                                label="Email"
                                name="email"
                                component={renderField}
                                type="email"
                            />
                        </fieldset>
                        <fieldset className="form-group">
                            <Field
                                className="form-control"
                                label="Endereço"
                                name="endereco"
                                component={renderField}
                                type="text"
                            />
                        </fieldset>
                        <fieldset className="form-group">
                            <Field
                                className="form-control"
                                label="Referência"
                                name="referencia"
                                component={renderField}
                                type="text"
                            />
                        </fieldset>
                        <fieldset className="form-group">
                            <Field
                                name="telefone1"
                                component={renderField}
                                type="text"
                                label="Telefone1"
                                normalize={normalizePhone}
                            />
                        </fieldset>
                        <fieldset className="form-group">
                            <Field
                                name="telefone2"
                                component={renderField}
                                type="text"
                                label="Telefone2"
                                normalize={normalizePhone}
                            />
                        </fieldset>
                        <fieldset className="form-group">
                            <Field
                                label="Observações"
                                name="observacoes"
                                component={renderField}
                                type="text"
                            />
                        </fieldset>
                        <fieldset className="form-group">
                            <Field
                                label="Data Início"
                                name="dataInicio"
                                component={renderField}
                                type="text"
                            />
                        </fieldset>
                        <fieldset className="form-group">
                            <Field
                                label="Indicação"
                                name="indicacao"
                                component={renderField}
                                type="text"
                            />
                        </fieldset>
                        {this.renderAlert()}
                        <button type="submit" className="input-agenda button-agenda">Cadastrar</button>
                        <Link to={'/'}>
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

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className="form-group">
    <div>
        <input 
            {...input} 
            className="input-agenda" 
            placeholder={label} 
            type={type}
        />
        
        {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

const mapStateToProps = (state) => {
    return {
        errorMessage: state.auth.error
    };
};

export default reduxForm({
    form: 'cadastroTotal',
    validate    
})(
    connect(mapStateToProps, actions)(CadastroTotal)
);
