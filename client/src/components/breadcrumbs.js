import React from 'react';
import { Link } from 'react-router-dom';
import './protectedComponent.css';

const Breadcrumbs = ({ location }) => {
  const crumbs = location.replace('/', '').split('/');

  return (
    <ul className="breadcrumbs">
      {crumbs.map((crumb, i) => <li key={i}>{crumb}</li>)}
    </ul>);
};

export default Breadcrumbs;
