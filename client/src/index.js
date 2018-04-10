/* eslint-disable */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import { SignIn, SignUp, Cards, Card, CardCreate, CardEdit, Settings, Billing } from './components';
import RequireAuth from './components/HOC/RequireAuth';
import reducers from './reducers';
// import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(ReduxThunk)
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/SignIn" component={SignIn} />
        <Route path="/SignUp" component={SignUp} />
        <Route path="/Cards" component={RequireAuth(Cards)} />
        <Route path="/Cards/:id" component={RequireAuth(Card)} />
        <Route path="/Card/Create" component={RequireAuth(CardCreate)} />
        <Route path="/Card/Edit/:id" component={RequireAuth(CardEdit)} />
        <Route path="/Settings" component={RequireAuth(Settings)} />
        <Route path="/Billing" component={RequireAuth(Billing)} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
// registerServiceWorker();
