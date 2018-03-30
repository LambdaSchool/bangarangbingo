import React from 'react';
import SideNav from './sidenav';

const Settings = () => (
  <div>
    <SideNav />
    <div className="settings">
      <h1>Settings</h1>
      <div className="paymentbox">
        <h3>NOT Wired Up and Working</h3>
        <input placeholder="Email" />
        <input placeholder="Old Password" />
        <input placeholder="New Password" />
      </div>
      <button>Save</button>
    </div>
  </div>
);

export default Settings;
