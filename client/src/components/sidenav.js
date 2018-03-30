import React from 'react';
import { Link } from 'react-router-dom';

const SideNav = () => (
  <div>
    <Link to="/Cards">Cards</Link>
    <Link to="/Billing">Billing</Link>
    <Link to="/Settings">Settings</Link>
  </div>
);

export default SideNav;
