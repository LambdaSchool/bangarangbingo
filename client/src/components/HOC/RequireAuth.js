/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../header';

function ComposedComponent(WrappedComponent) {
  class RequireAuthentication extends Component {
    componentDidMount() {
      if(!this.props.authenticated) {
        this.props.history.push('/login');
      }
    }
    render() {
      return (
        <div>
          <Header authenticated={this.props.authenticated}/>
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
