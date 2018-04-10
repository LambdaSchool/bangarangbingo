import React from 'react';
import { Link } from 'react-router-dom';
import './protectedComponent.css';

const Breadcrumbs = (props) => {
  if (props.props === '/cards') {
    return (
      <ul className="breadcrumbs">
        <li>Cards</li>
      </ul>
    );
  }
  return (
    <ul className="breadcrumbs">
      <li><Link to="/cards">Cards</Link></li>
      <li>{props.props}</li>
    </ul>
  );
};

export default Breadcrumbs;
