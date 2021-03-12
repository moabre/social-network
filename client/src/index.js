import React from 'react';
import ReactDOM from 'react-dom';
import jwtDecode from 'jwt-decode';
import { Provider } from 'react-redux';
import setAuthToken from './setAuthToken';
import { logoutUser, setCurrentUser } from './actions/authActions';
import App from './App';
import store from './store';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwtDecode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/';
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
