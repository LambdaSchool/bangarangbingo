/* eslint-disable */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions';
import './auth.css';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    if(this.state.email && this.state.password) {
      this.props.login(this.state.email, this.state.password, this.props.history);
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
  }

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
          <input type="email" name="email" placeholder="email" value={this.state.email} onChange={e => this.handleChange(e, 'email')}/>
          <label>Password:</label>
          <input type="password" name="password" placeholder="password" value={this.state.password} onChange={e => this.handleChange(e, 'password')}/>
          <button type="submit">Login</button>
        </form>
        <section class="alternativeActions">
          <span>If you do not already have an account, <Link to="/register">Sign up!</Link></span>
          <Link to="/forgot-password">Forgot Password?</Link>
        </section>
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

export default connect(mapStateToProps, { login })(SignIn);