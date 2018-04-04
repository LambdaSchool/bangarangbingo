/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCards } from '../actions';
import SideNav from './sidenav';


class Cards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
    };
  }

  componentDidMount() {
    const authUser = JSON.parse(localStorage.getItem('user'));
    this.setState({'user': authUser});
  }

  render() {
    return (
      <div>
        <SideNav />
        <div className="cards">
          USER CARD PAGE
        </div>
        <Link to="/Card">Link to SINGLE Card Create/Edit</Link>
        <p>{this.state.user._id}</p>
        <p>{this.state.user.username}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cards: state.cards
  }
}

export default connect(mapStateToProps, { getCards })(Cards);
