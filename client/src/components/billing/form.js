import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { connect } from 'react-redux';
import { processPayment } from '../../actions';

import './style.css';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };
  }
  handleChange(e, field) {
    this.setState({
      [field]: e.target.value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.name && this.state.email) {
      const createToken = this.props.stripe.createToken({ name: this.state.name });
      createToken.then(({ error, token }) => {
        if (token) {
          this.props.processPayment(token, {
            name: this.state.name,
            email: this.state.email,
          });
        }
      }).catch((err) => {
        console.log(err);
      });
    }

  }
  render() {
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <label>Name:</label>
        <input
          name="name"
          type="text"
          value={this.state.name}
          placeholder="John Smith"
          onChange={e => this.handleChange(e, 'name')}
        />
        <label>Email:</label>
        <input
          name="email"
          type="email"
          value={this.state.email}
          placeholder="email@example.com"
          onChange={e => this.handleChange(e, 'email')}
        />
        <CardElement />
        <button type="submit">Confirm Subscription</button>
        <style jsx scoped>
          {`
          form button {
            text-decoration: none;
            background: #239999;
            color: #fff;
            padding: 10px 20px;
            border: none;
            margin-top: 20px;
          }
          label {
            display: none;
          }
          input {
            background-color: white;
            height: 40px;
            border-radius: 4px;
            border: 1px solid transparent;
            box-shadow: 0 1px 3px 0 #0000003b;
            transition: box-shadow 150ms ease;
            margin-bottom: 20px;
            margin-right: 20px;
            outline: none;
            font-size: 14px;
            padding: 0 15px 0 10px;
          }
          input:focus {
            box-shadow: 0 1px 3px 0 #cfd7df;
          }

        `}
        </style>
      </form>
    );
  }
}

export default connect(null, { processPayment })(injectStripe(Form));
