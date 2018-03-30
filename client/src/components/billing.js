import React from 'react';
import SideNav from './sidenav';

const Billing = () => (
  <div>
    <SideNav />
    <div className="billing">
      <h1>BILLING</h1>
      <div className="paymentbox">
        <p>Payment Info</p>
        <input placeholder="CC#" />
        <input placeholder="EXP#" />
        <input placeholder="CVV" />
      </div>
      <div>
        <p>1 Year Subscriptiohn</p>
        <p>1 Year Subscriptiohn</p>
      </div>
      <button>Buy Now</button>
    </div>
  </div>
);

export default Billing;
