import React from 'react';
import { Link } from 'react-router-dom';
import SideNav from './sidenav';

const Cards = () => (
  <div>
    <SideNav />
    <div className="cards">
      USER CARD PAGE
    </div>
    <Link to="/Card">Link to SINGLE Card Create/Edit</Link>
  </div>
);

export default Cards;
