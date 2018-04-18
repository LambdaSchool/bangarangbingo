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
      purchaseType: 'subscription',
      numCardsOrdered: null,
      amtCharged: 999,
    };
  }

  handleRadioChange(value) {
    let charge;
    if (this.props.card.card.content) {
      const numOrdered = this.props.card.card.content.length;
      charge = (numOrdered * .99).toFixed(2) * 100;
    }
    this.setState({ purchaseType: value });
    value === 'oneTime' ? this.setState({ amtCharged: charge }) : this.setState({ amtCharged: 999 });
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
            purchaseType: this.state.purchaseType,
            numCardsOrdered: this.state.numCardsOrdered,
            amtCharged: this.state.amtCharged,
          });
        }
      }).catch((err) => {
        console.log(err);
      });
    }

  }

  render() {
    let charge;
    if (this.props.card.card.numCards) {
      this.state.numCardsOrdered = this.props.card.card.numCards;
      charge = (this.state.numCardsOrdered * .99).toFixed(2);
    }
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        { this.props.card.card.numCards
          ? <RadioGroup name="buyOption" selectedValue={this.state.purchaseType} onChange={event => this.handleRadioChange(event)}>
            <Radio value="subscription" />One-Year Subscription - Unlimited Cards - $9.99
            <br />
            <Radio value="oneTime" />One-Time Purchase - {this.state.numCardsOrdered} Cards at $.99 a piece - ${charge}
          </RadioGroup>
          : <RadioGroup name="buyOption" selectedValue={this.state.purchaseType} onChange={event => this.handleRadioChange(event)}>
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
