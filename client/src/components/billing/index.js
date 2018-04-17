/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../layout';
import Checkout from './checkout';

class Billing extends Component {
  render() {
    const card = this.props.card.card.content;
    console.log('card in Billing', card);
    return (
      <Layout logout={this.props.logout}>
        <div className="root">
          <header>
            <h1>Subscribe for unlimited Bingo Cards!</h1>
          </header>
          <section className="content">
            <Checkout />
          </section>
        </div>
        <style jsx scoped>
          {`
          .root {
            background: #ffffff;
            max-width: 1440px;
            margin: 0 auto;
            box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.1);
            padding: 20px;
            border-radius: 4px;
          }
          header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;        
          }
          `}
        </style>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    card: state.card,
  };
};

export default connect(mapStateToProps)(Billing);
