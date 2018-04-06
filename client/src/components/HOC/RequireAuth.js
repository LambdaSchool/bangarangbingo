/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../header';

function ComposedComponent(WrappedComponent) {
  class RequireAuthentication extends Component {
    componentWillMount() {
      if (!this.props.authenticated) {
        this.props.history.push('/signin');
      }
    }

    render() {
      if (!this.props.authenticated) return <div><p>No Auth</p></div>;
      return (
        <div>
          <Header />
          <WrappedComponent history={this.props.history}/>
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      authenticated: state.auth.authenticated,
    };
  };

  return connect(mapStateToProps)(RequireAuthentication);
};

export default ComposedComponent;
