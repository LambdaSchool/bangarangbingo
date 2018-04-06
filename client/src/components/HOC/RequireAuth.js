/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../header';

function ComposedComponent(WrappedComponent) {
  class RequireAuthentication extends Component {
    constructor() {
      super();
      this.state = {
        token: '',
        user: {}
      }
    }
    componentWillMount() {
      this.setState({
        token: localStorage.getItem('token'),
        user: localStorage.getItem('user'),
      });
    }

    render() {
      if (!this.state.token && !this.state.user) return <div><p>No Auth</p></div>;
      return (
        <div>
          <Header authenticated={!!this.state.token && !!this.state.user}/>
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
