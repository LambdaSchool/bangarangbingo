/* eslint-disable */

import React from 'react';
import { Link } from 'react-router-dom';
import './landing.css';

const Landing = () => (
  <div className="landing">
    <div className="background">
      <video autoPlay muted loop className="background__video">
        <source src="/video/people_talking.mp4" type="video/mp4" />
      </video>
    </div>
    <div className="content">
      <div className="content__header"><img src="/images/logo-teal.gif" alt="Bangarang Bingo" /></div>
      <div className="content__textbox">
        <p>Inject fun into your next gathering, party, or event with custom bingo cards.</p>
        <p>
          Making bingo cards can be time consuming and difficult, but now there’s an easy way to make beautiful,
          print ready bingo cards. Simply input your words, choose some styling options, and we do the rest!
        </p>
      </div>
      <div className="content__button"><Link to="/login" className="links__button">Make Your Bingo Card Now!</Link></div>
    </div>
  </div>
);

export default Landing;
