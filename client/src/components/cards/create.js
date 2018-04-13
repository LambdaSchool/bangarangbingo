import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../layout';

const ROOT_URL = process.env.NODE_ENV === 'production' ? 'https://bangarangbingo.herokuapp.com' : 'http://localhost:3000';

const CreateCard = props => (
  <Layout logout={props.logout}>
    <div className="root">
      <header>
        <h1>Customize Your Cards</h1>
      </header>
      <section className="content">
        <section className="card-area">
            <iframe src={`${ROOT_URL}/pdf.html`} title="card" width="100%" height="1000px" />
          </section>
      </section>
    </div>
    <style jsx scoped>
      {`
    .root {
      max-width: 1440px;
      margin: 0 auto;
      padding: 20px;
    }
    `}
    </style>
  </Layout>
);

export default CreateCard;
