import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { connect } from 'react-redux';
import { RadioGroup, Radio } from 'react-radio-group';
import { processPayment } from '../../actions';

import './style.css';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      selectedValue: 'subscription',
    };
  }

  handleRadioChange(value) {
    this.setState({ selectedValue: value });
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
    let numOrdered = 0;
    if (this.props.card.card.content) {
      numOrdered = this.props.card.card.content.length;
    }
    const cost = (numOrdered * .99).toFixed(2);
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        { this.props.card.card.content
          ? <RadioGroup name="buyOption" selectedValue={this.state.selectedValue} onChange={this.handleRadioChange}>
            <Radio value="subscription" />One-Year Subscription - Unlimited Cards - $9.99
            <br />
            <Radio value="oneTime" />One-Time Purchase - {numOrdered} Cards at $.99 a piece - ${cost}
          </RadioGroup>
          : <RadioGroup name="buyOption" selectedValue={this.state.selectedValue} onChange={this.handleRadioChange}>
            <Radio value="subscription" />One-Year Subscription - Unlimited Cards - $9.99
          </RadioGroup>
        }
        <br />
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

const mapStateToProps = (state) => {
  return {
    card: state.card,
  };
};

export default connect(mapStateToProps, { processPayment })(injectStripe(Form));
