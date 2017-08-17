import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signup extends Component {
    handleFormSubmit({ email, password }) {
        this.props.signupUser({ email, password });
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
        const { handleSubmit, fields: { email, password, passwordConfirm } } = this.props;
        return (
            <div className="signin">            
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>

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
                            label="Password"
                            name="password"
                            component={renderField}
                            type="password"
                        />
                    </fieldset>
                    <fieldset className="form-group">
                        <Field
                            label="Confirm password"
                            name="passwordConfirm"
                            component={renderField}
                            type="password"
                        />
                    </fieldset>
                    <fieldset className="form-group">
                        <Field
                            label="Age"
                            name="age"
                            component={renderField}
                            type="number"
                        />
                    </fieldset>
                    {this.renderAlert()}
                    <button type="submit" className="btn btn-primary">Sign up</button>
                </form>
            </div>
        );
    }
}

const validate = values => {
  const errors = {};
  if (!values.password) {
    errors.password = 'Required';
  } 
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required';
  } 
  if (!values.age) {
    errors.age = 'Required';
  } else if (isNaN(Number(values.age))) {
    errors.age = 'Must be a number';
  } else if (Number(values.age) < 18) {
    errors.age = 'Sorry, you must be at least 18 years old';
  }
  return errors;
};

const warn = values => {
  const warnings = {};
  if (values.age < 19) {
    warnings.age = 'Hmm, you seem a bit young...';
  }
  return warnings;
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
    form: 'signup',
    fields: ['email', 'password', 'passwordConfirm'],
    validate,
    warn
})(
    connect(mapStateToProps, actions)(Signup)
);
