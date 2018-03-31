import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import { SignIn, SignUp, Cards, Settings, Billing } from './components';
import RequireAuth from './components/HOC/RequireAuth';
import reducers from './reducers';
// import registerServiceWorker from './registerServiceWorker';

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/SignIn" component={SignIn} />
        <Route path="/SignUp" component={SignUp} />
        <Route path="/Cards" component={RequireAuth(Cards)} />
        <Route path="/Settings" component={RequireAuth(Settings)} />
        <Route path="/Billing" component={RequireAuth(Billing)} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
// registerServiceWorker();
