import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Home from '../home';
import normalizePhone from '../helpers/normalizePhone';

class Cadastro extends Component {   
    
    // componentWillMount() {
    //     this.props.fetchMessage()
    // }

    handleFormSubmit(formProps) {
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
                    <fieldset>
                        <Field
                            name="telefone"
                            component={renderField}
                            type="text"
                            label="Telefone"
                            normalize={normalizePhone}
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
                            label="Data Fim"
                            name="dataFim"
                            component={renderField}
                            type="text"
                        />
                    </fieldset>
                    {this.renderAlert()}
                    <button type="submit" className="btn btn-primary">Cadastrar</button>
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

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className="form-group">
    <label>{label}</label>
    <div>
      <input {...input} className="form-control" placeholder={label} type={type} />
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
    form: 'cadastro',
    validate    
})(
    connect(mapStateToProps, actions)(Cadastro)
);
