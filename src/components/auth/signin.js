import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signin extends Component {
    handleFormSubmit({ email, password }) {
        this.props.signinUser({ email, password });
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
            <div className="signin">            
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>

                    <fieldset className="form-group">
                        <Field
                            className="form-control"
                            label="Email"
                            name="email"
                            component={renderField}
                            type="text"
                        />
                    </fieldset>
                    <fieldset className="form-group">
                        <Field
                            className="form-control"
                            label="Password"
                            name="password"
                            component={renderField}
                            type="password"
                        />
                    </fieldset>
                    {this.renderAlert()}
                    <button type="submit" className="btn btn-primary">Sign in</button>
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
    form: 'signin',
    fields: ['email', 'password'],
    validate
})(
    connect(mapStateToProps, actions)(Signin)
);

