import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCard } from '../../actions/billing';
import { push } from 'react-router-redux';

const ROOT_URL = process.env.NODE_ENV === 'production' ? 'https://bangarangbingo.herokuapp.com' : 'http://localhost:3000';

class PDFViewer extends Component {
  componentDidMount() {
    if (this.props.cardToEdit) {
      const iframe = document.getElementById("PDFViewer");
      iframe.contentWindow.postMessage(this.props.card, '*');
    }
    window.addEventListener('message', message => this.handleMessage(message));
  }
  handleMessage(e) {
    const { origin } = e;
    if (origin === ROOT_URL) {
      const card = e.data;
      const test = this.props.setCard(card);
      this.props.push('/billing');
    }
  }
  render() {
    return <iframe id="PDFViewer" src={`${ROOT_URL}/pdf/buy/pdf.html`} title="card" width="100%" height="1000px" />;
  }
}

const mapStateToProps = state => ({
  bingoCard: state.card,
});

const mapDispatchToProps = dispatch => ({
  setCard: card => dispatch(setCard(card)),
  push: to => dispatch(push(to)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PDFViewer);
