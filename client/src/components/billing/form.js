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
      createToken.then(({ error, token}) => {
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
          onChange={e => this.handleChange(e, 'name')}
        />
        <label>Email:</label>
        <input
          name="email"
          type="email"
          value={this.state.email}
          onChange={e => this.handleChange(e, 'email')}
        />
        <CardElement />
        <button type="submit">Confirm order</button>
      </form>
    );
  }
}

export default connect(null, { processPayment })(injectStripe(Form));
