import React from 'react';
import { Link } from 'react-router-dom';
import './protectedComponent.css';

const SideNav = () => (
  <div className="sidenav">
    <Link to="/Cards" className="sidenav__item">Cards</Link>
    <Link to="/Billing" className="sidenav__item">Billing</Link>
    <Link to="/Settings" className="sidenav__item">Settings</Link>
  </div>
);

export default SideNav;
