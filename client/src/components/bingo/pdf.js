import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initOrder } from '../../actions/billing';
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
    console.log('message arrived: ', e);
    const origin = e.origin;
    const message = e.data;
    const { source } = message;
    if (source === 'pdf-design' && origin === ROOT_URL) {
      const { card } = message;
      this.props.initOrder(card);
    }
  }
  render() {
    return <iframe id="PDFViewer" src={`${ROOT_URL}/pdf-design.html`} title="card" width="100%" height="1000px" />;
  }
}

const mapStateToProps = state => ({
  bingoCard: state.card,
});



export default connect(mapStateToProps, { initOrder })(PDFViewer);
