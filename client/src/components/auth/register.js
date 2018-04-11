/* eslint-disable */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { register } from '../../actions';
import './auth.css';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    if(this.state.email && this.state.password && this.state.confirmPassword) {
      this.props.register(this.state.email, this.state.password, this.state.confirmPassword, this.props.history);
    }
  }
  handleChange(event, field) {
    this.setState({
      [field]: event.target.value
    });
  }
  renderAlert() {
    if (!this.props.error) return null;
    return <h3>{this.props.error}</h3>;
  };

  render() {
    return (
      <div className="auth">
        <header>
        <Link to="/"><img src="/images/logo.gif" alt="Bangarang Bingo"/></Link>        
          <ul classSName="errors">
            { this.renderAlert() }
          </ul>
        </header>
        <form onSubmit={e => this.handleSubmit(e)}>
          <label>Email:</label>
          <input type="email" name="email" placeholder="email" onChange={e => this.handleChange(e, 'email')} value={this.state.email}/>
          <label>Password:</label>
          <input type="password" name="password" placeholder="password" onChange={e => this.handleChange(e, 'password')} value={this.state.password}/>
          <label>Confirm Password:</label>
          <input type="password" name="confirmPassword" placeholder="confirm password" onChange={e => this.handleChange(e, 'confirmPassword')} value={this.state.confirmPassword}/>
          
          <button type="submit">Sign up!</button>
        </form>
        <section class="alternativeActions">
          <span>Already have an account, <Link to="/login">Login!</Link></span>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
  };
};

export default connect(mapStateToProps, { register })(SignUp);

