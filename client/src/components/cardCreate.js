import React, { Component } from 'react';
import axios from "axios";
import SideNav from './sidenav';
import Bingo from './bingo';
import './protectedComponent.css';
import Breadcrumbs from './breadcrumbs';

const ROOT_URL = process.env.NODE_ENV === 'production' ? 'https://bangarangbingo.herokuapp.com' : 'http://localhost:3000';

class CardCreate extends Component {
  // componentDidMount() {
  //   const el = document.getElementById('card');
  //   axios.get(`${ROOT_URL}/pdf`).then((response) => {
  //     console.log(response);
  //     el.innerHTML = JSON.stringify(response.data, null, 2);
  //   });
  // }
  render() {
    return (
      <div className="protectedComponent">
        <div>
          <SideNav />
        </div>
        <div className="cardCreate">
          <Breadcrumbs location={this.props.history.location.pathname} />
          <h3>CARD CREATE PAGE</h3>
          <label>Card name:
            <input id="cardname" name="cardname" type="text" />
          </label>
          <section className="card-area">
            <iframe src={`${ROOT_URL}/pdf.html`} title="card" width="100%" height="1000px"/>
          </section>
          {/* <section className="card-preview" style={{ width: '90%', margin: '0 auto' }}>
            <h1>Card Preview</h1>
            <Bingo />
          </section> */}
        </div>
      </div>
    );
  }
}

export default CardCreate;
