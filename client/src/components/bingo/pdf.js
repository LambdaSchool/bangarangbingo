import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCard } from '../../actions/billing';
import { push } from 'react-router-redux';

const ROOT_URL = process.env.NODE_ENV === 'production' ? 'https://bangarangbingo.herokuapp.com' : 'http://localhost:3000';

class PDFViewer extends Component {
  componentDidMount() {
    window.addEventListener('message', message => this.handleMessage(message));
  }
  handleMessage(e) {
    const { origin } = e;
    if (origin === ROOT_URL) {
      const card = e.data;
      const test = this.props.setCard(card);
      console.log(test);
      this.props.push('/billing');
    }
  }
  render() {
    return <iframe src={`${ROOT_URL}/pdf/buy/pdf.html`} title="card" width="100%" height="1000px" />;
  }
}

const mapDispatchToProps = dispatch => ({
  setCard: card => dispatch(setCard(card)),
  push: to => dispatch(push(to)),
});

export default connect(null, mapDispatchToProps)(PDFViewer);
