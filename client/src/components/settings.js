/* eslint-disable */

import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { updateUser } from '../actions';
import SideNav from './sidenav';
import Breadcrumbs from './breadcrumbs';
import './protectedComponent.css';

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
      <div className="protectedComponent">
        <SideNav />
        <div className="component">
          <Breadcrumbs props={this.props.match.url} />
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className="reduxForm">
            <h3 className="formTitle">Update Password</h3>
            <div className="formInput">
              <div className="formInput__item">
                <label>Email:</label>
                <Field name="username" component="input" type="text" className="inputField" />
              </div>
              <div className="formInput__item">
                <label>Old Password:</label>
                <Field name="password" component="input" type="password" className="inputField" />
              </div>
              <div className="formInput__item">
                <label>Confirm Old Password:</label>
                <Field name="confirmPassword" component="input" type="password" className="inputField" />
              </div>
              <div className="formInput__item">
                <label>New Password:</label>
                <Field name="newPassword" component="input" type="password" className="inputField" />
              </div>
              <div className="formInput__item">
                <label>Confirm New Password:</label>
                <Field name="confirmNewPassword" component="input" type="password" className="inputField" />
              </div>
            </div>
            <button action="submit" className="formButton">Save</button>
            {this.renderAlert()}
          </form>
        </div>
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

export default withRouter(reduxForm({
  form: 'settings',
  fields: ['username', 'password', 'confirmPassword', 'newPassword', 'confirmNewPassword']
})(Settings));