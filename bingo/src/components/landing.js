import React from 'react';
import { Link } from 'react-router-dom';
import './landing.css';

const Landing = () => (
  <div className="landing">
    <div className="navlinks">
      <div><Link to="/SignUp" className="navlinks__button">Sign Up</Link></div>
      <div><Link to="/SignIn" className="navlinks__button">Sign In</Link></div>
    </div>
    <div className="landing__content">
      <div className="header">Bangarang Bingo</div>
      <div className="carousel">
        <div className="icon-cards">
          <div className="icon-cards__content">
            <div className="icon-cards__item">BINGO</div>
            <div className="icon-cards__item">BINGO</div>
            <div className="icon-cards__item">BINGO</div>
          </div>
        </div>
      </div>
      <div className="text">
        <p>Making your own bingo cards is time consuming and difficult.</p>
        <p>Finally, an easy way to make beautiful,
          print ready bingo cards for your parties and events.
        </p>
        <p>Simply input your words, choose some styling options, and we do the rest!</p>
      </div>
      <div><Link to="/SignUp" className="links__button">Make Your Bingo Card Now!</Link></div>
    </div>
  </div>
);

export default Landing;
