import React from 'react';
import SideNav from './sidenav';
import Bingo from './bingo';
import './protectedComponent.css';
import Breadcrumbs from './breadcrumbs';

const CardCreate = (props) => {
  return (
    <div className="protectedComponent">
      <div>
        <SideNav />
      </div>
      <div className="cardCreate">
        <Breadcrumbs location={props.history.location.pathname} />
        <h3>CARD CREATE PAGE</h3>
        <label>Card name:
          <input id="cardname" name="cardname" type="text" />
        </label>
        <section className="card-preview" style={{ width: '90%', margin: '0 auto' }}>
          <h1>Card Preview</h1>
          <Bingo />
        </section>
      </div>
    </div>
  );
};

export default CardCreate;
