/* eslint-disable */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import { Login, Register, Cards, Card, CardCreate, Settings, Billing } from './components';
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
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/cards" component={RequireAuth(Cards)} />
        <Route path="/card/create" component={RequireAuth(CardCreate)} />
        <Route path="/card/:id" component={RequireAuth(Card)} />
        <Route path="/settings" component={RequireAuth(Settings)} />
        <Route path="/billing" component={RequireAuth(Billing)} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
// registerServiceWorker();
