import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { getCard } from '../../actions';
import Layout from '../layout';
import PDFViewer from '../bingo/pdf';
import axios from 'axios';
const ROOT_URL = process.env.NODE_ENV === 'production' ? 'https://bangarangbingo.herokuapp.com' : 'http://localhost:8080';

class EditCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card: {},
    };
  }
  componentDidMount() {
    this.setCard(this.props.match.params.id);
    console.log('this got called');    
  }
  async setCard(id) {
    try {
      const authToken = window.localStorage.getItem('token');
      const { data } = await axios.get(`${ROOT_URL}/card/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const { card } = data;
      // we have card, now we have to set the card to edit;
      console.log('set card: ', data);
      this.setState({ card }, (test) => {
        console.log('after', test);
      });
    } catch (e) {
      console.log('set card: ', e);
    }
  }
  render() {
    const { props } = this;
    const { card } = this.state;
    console.log('render with: ', card);
    return (
      <Layout logout={props.logout}>
        <div className="root">
          <header>
            <h1>Edit Your Cards</h1>
          </header>
          <section className="content">
            <section className="card-area">
              <PDFViewer cardToEdit={this.state.card} />
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
  }
}

const mapStateToProps = (state) => ({
    cardToEdit: state.card,
  });

export default withRouter(connect(mapStateToProps, { getCard })(EditCard));
