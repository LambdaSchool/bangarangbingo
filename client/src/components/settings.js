import React from 'react';
import SideNav from './sidenav';
import Breadcrumbs from './breadcrumbs';
import UpdatePassword from './updatePassword';
import UpdateEmail from './updateEmail';
import './protectedComponent.css';

const Settings = (props) => {
  return (
    <div className="protectedComponent">
      <div>
        <SideNav />
      </div>
      <div className="cardCreate">
        <Breadcrumbs location={props.history.location.pathname} />
        <h3>USER SETTINGS</h3>
        <UpdatePassword history={props.history} />
        <UpdateEmail />
      </div>
    </div>
  );
};

export default Settings;
