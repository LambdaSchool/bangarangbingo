import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../layout';

const Dash = props => (
  <Layout logout={props.logout}>
    <div className="root">
      <header>
        <span>Welcome!</span>
        <Link to="/card/create">Create Cards</Link>
      </header>
      <section className="content">
        { console.log(props, props.cards)}
        {props.cards && props.cards.map(card => <span>card</span>)}
        {!props.cards &&
          <Link to="/card/create" className="empty">
            <span>You don't have any bingo cards!</span>
            <span>Click to get started!</span>
          </Link>
        }
      </section>
      <div><Link to="/aboutUs">About Us</Link></div>
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
      header :global(a) {
        text-decoration: none;
        background: #239999;
        color: #fff;
        padding: 10px 20px;
      }
      .content :global(.empty) {
        display: block;
        padding: 75px;
        background: #eaeaea;
        text-align: center;
        text-decoration: none;
        color: #000;
      }
      .content :global(.empty span) {
        display: block;
        padding: 5px;
      }
      `}
      </style>
    </div>
  </Layout>
);

export default Dash;
