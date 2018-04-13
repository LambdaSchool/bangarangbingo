import React from 'react';
import SideNav from '../sidenav';
import Breadcrumbs from '../breadcrumbs';
import '../protectedComponent.css';
import Checkout from './checkout';

const Billing = props => (
  <div className="protectedComponent">
    <SideNav />
    <div className="component">
      <Breadcrumbs location={props.history.location.pathname} />
      <Checkout />
    </div>
  </div>
);

export default Billing;
