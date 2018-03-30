import React from 'react';
import { Link } from 'react-router-dom';

const SideNav = () => (
  <div>
    <Link path="/Cards">Cards</Link>
    <Link path="/Billing">Billing</Link>
    <Link path="/Settings">Settings</Link>
  </div>
);

export default SideNav;
