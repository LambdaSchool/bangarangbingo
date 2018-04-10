/* eslint-disable */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { login } from '../../actions';
import './auth.css';

class SignIn extends Component {
  handleFormSubmit({ username, password }) {
    this.props.login(username, password, this.props.history);
  }

  renderAlert() {
    if (!this.props.error) return null;
    return <h3>{this.props.error}</h3>;
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="authForm">
        <div className="formContainer">
          <h3 className="formTitle">Sign In</h3>
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className="reduxForm">
            <div className="formInput__item">
              <label>Email:</label>
              <Field name="username" component="input" type="text" className="inputField" />
            </div>
            <div className="formInput__item">
              <label>Password:</label>
              <Field name="password" component="input" type="password" className="inputField" />
            </div>
            <button action="submit" className="formButton">Sign In</button>
            {this.renderAlert()}
          </form>
        </div>
        <div className="redirect">If you do not already have an account, <Link to="/register">Sign Up</Link>!</div>
        <Link to="/" className="return">LANDING PAGE</Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    authenticated: state.auth.authenticated,
  };
};

SignIn = connect(mapStateToProps, { login })(SignIn);

export default reduxForm({
  form: 'signin',
  fields: ['username', 'password']
})(SignIn);

