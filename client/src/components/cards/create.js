import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../layout';
import PDFViewer from '../bingo/pdf';


const CreateCard = props => (
  <Layout logout={props.logout}>
    <div className="root">
      <header>
        <h1>Customize Your Cards</h1>
      </header>
      <section className="content">
        <section className="card-area">
          <PDFViewer />    
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
