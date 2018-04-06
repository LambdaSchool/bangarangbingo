import React from 'react';
import SideNav from './sidenav';
import './protectedComponent.css';

const Billing = () => (
  <div className="protectedComponent">
    <SideNav />
    <div className="reduxForm">
      <h3 className="formTitle">BILLING</h3>
      <div className="paymentbox">
        <h4 className="formTitle">Payment Info</h4>
        <input placeholder="CC#" />
        <input placeholder="EXP#" />
        <input placeholder="CVV" />
      </div>
      <div>
        <div className="checkbox">
          <input type="checkbox" value="option1" />
          1 card $0.99
        </div>
        <div className="checkbox">
          <input type="checkbox" value="option2" />
          1 Year Subscription $9.99
        </div>
      </div>
      <button className="formButton">Buy Now</button>
    </div>
  </div>
);

export default Billing;
