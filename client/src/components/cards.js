/* eslint-disable */

import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCards } from '../actions';
import SideNav from './sidenav';
import Breadcrumbs from './breadcrumbs';
import './protectedComponent.css';


class Cards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
    };
  }

  componentDidMount() {
    const authUser = JSON.parse(localStorage.getItem('user'));
    this.setState({ user: authUser });
    this.props.getCards();
  }

  render() {
    console.log('in cards.js this.props.cards', this.props.cards);
    console.log('this.props.match.url', this.props.match.url);
    return (
      <div className="protectedComponent">
        <div>
          <SideNav />
        </div>
        <div className="cards">
          <Breadcrumbs location={this.props.match.url} />
          <h3>USER CARD PAGE</h3>
          <p>Welcome, {this.state.user.username}!</p>
          <ul className="cardsList">
            { this.props.cards.map((card, i) => {
              if (card.author === this.state.user._id) {
                return (
                  <Link className="cardLinks" to={`/Cards/${card._id}`} key={card._id+i}>{card.title}</Link>
                );
              }
            })
            }
          </ul>
          <Link to="/card/create" className="formButton">Create New Bingo Card</Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cards: state.cards,
  };
};

export default withRouter(connect(mapStateToProps, { getCards })(Cards));
