import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCard } from '../../actions';
import Layout from '../layout';
import PDFViewer from '../bingo/pdf';


class EditCard extends Component {
  componentDidMount() {
    this.props.getCard(this.props.match.params.id);
  }

  render() {
    const { props } = this;
    return (
      <Layout logout={props.logout}>
        <div className="root">
          <header>
            <h1>Edit Your Cards</h1>
          </header>
          <section className="content">
            <section className="card-area">
              <PDFViewer cardToEdit={this.props.cardToEdit} />
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
    )
  }
};

const mapStateToProps = (state) => {
  return {
    cardToEdit: state.card,
  };
};

export default connect(mapStateToProps, { getCard })(EditCard);
