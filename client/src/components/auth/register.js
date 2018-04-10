/* eslint-disable */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { register } from '../../actions';
import './auth.css';

class SignUp extends Component {
  handleFormSubmit({ username, password, confirmPassword }) {
    this.props.register(username, password, confirmPassword, this.props.history);
  }

  renderAlert() {
    if (!this.props.error) return null;
    return <h3>{this.props.error}</h3>;
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="authForm">
        <div className="formContainer">
          <h3 className="formTitle">Sign Up</h3>
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className="reduxForm">
            <div>
              <div className="formInput__item">
                <label>Email:</label>
                <Field name="username" component="input" type="text" className="inputField" />
              </div>
              <div className="formInput__item">
                <label>Password:</label>
                <Field name="password" component="input" type="password" className="inputField" />
              </div>
              <div className="formInput__item">
                <label>Confirm Password:</label>
                <Field name="confirmPassword" component="input" type="password" className="inputField" />
              </div>
            </div>
            <button action="submit" className="formButton">Sign Up</button>
            {this.renderAlert()}
          </form>
        </div>
        <div className="redirect">Already have an account? <Link to="/SignIn">Sign In</Link>!</div>
        <Link to="/" className="return">LANDING PAGE</Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
  };
};

SignUp = connect(mapStateToProps, { register })(SignUp);

export default reduxForm({
  form: 'signup',
  fields: ['username', 'password', 'confirmPassword']
})(SignUp);
