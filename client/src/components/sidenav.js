import React from 'react';
import { Link } from 'react-router-dom';
import './protectedComponent.css';

const SideNav = () => (
  <div className="sidenav">
    <Link to="/cards" className="sidenav__item">Cards</Link>
    <Link to="/billing" className="sidenav__item">Billing</Link>
    <Link to="/settings" className="sidenav__item">Settings</Link>
  </div>
);

export default SideNav;
