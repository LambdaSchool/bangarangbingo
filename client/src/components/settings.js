/* eslint-disable */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { updateUser } from '../actions';
import SideNav from './sidenav';

class Settings extends Component {
  handleFormSubmit({ username, password, confirmPassword, newPassword, confirmNewPassword }) {
    this.props.updateUser(username, password, confirmPassword, newPassword, confirmNewPassword, this.props.history);
  }

  renderAlert() {
    if (!this.props.error) return null;
    return <h3>{this.props.error}</h3>;
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <SideNav />
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <fieldset>
            <label>Email:</label>
            <Field name="username" component="input" type="text" />
          </fieldset>
          <fieldset>
            <label>Old Password:</label>
            <Field name="password" component="input" type="password" />
          </fieldset>
          <fieldset>
            <label>Confirm Old Password:</label>
            <Field name="confirmPassword" component="input" type="password" />
          </fieldset>
          <fieldset>
            <label>New Password:</label>
            <Field name="newPassword" component="input" type="password" />
          </fieldset>
          <fieldset>
            <label>Confirm New Password:</label>
            <Field name="confirmNewPassword" component="input" type="password" />
          </fieldset>
          <button action="submit">Save</button>
          {this.renderAlert()}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
  };
};

Settings = connect(mapStateToProps, { updateUser })(Settings);

export default reduxForm({
  form: 'settings',
  fields: ['username', 'password', 'confirmPassword', 'newPassword', 'confirmNewPassword']
})(Settings);