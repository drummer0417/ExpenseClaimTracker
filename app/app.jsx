var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
var store = require('configureStore').configure();
var {hashHistory} = require('react-router');

// var ClaimApp = require('ClaimApp');
var ClaimApi = require('ClaimApi');
var actions = require('actions');
import firebase from 'firebase';
import router from 'router';

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(actions.login(user.uid));
    store.dispatch(actions.startInitializeClaims());
    hashHistory.push('/claims');
  } else {
    hashHistory.push('/');
    store.dispatch(actions.logout());
  }
});
// Load foundation
// require('style!css!foundation-sites/dist/css/foundation.min.css');
$(document).foundation();

// Load css: actually scss / sass
require('style!css!sass!applicationStyles');

ReactDOM.render(
  <Provider store={store}>
    {router}
  </Provider>,
  document.getElementById("app")
);
