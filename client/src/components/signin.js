/* eslint-disable */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { login } from '../actions';

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
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <fieldset>
            <label>Email:</label>
            <Field name="username" component="input" type="text" />
          </fieldset>
          <fieldset>
            <label>Password:</label>
            <Field name="password" component="input" type="password" />
          </fieldset>
          <button action="submit">Sign In</button>
          {this.renderAlert()}
        </form>
        <div>If you do not already have an account, <Link to="/SignUp">Sign Up</Link>!</div>
        <Link to="/">LANDING PAGE</Link>
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

