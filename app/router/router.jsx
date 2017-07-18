var React = require('react');
var { Route, Router, IndexRoute, hashHistory } = require('react-router');

// var ClaimApp = require('ClaimApp');
import firebase from 'firebase';
import Login from 'Login';
import ClaimApp from 'ClaimApp';
import ClaimDetails from 'ClaimDetails';

var requireLogin = (nextState, replace, next) => {
  if (!firebase.auth().currentUser) {
    console.log('not currentUser');
    replace('/');
  }
  next();
}

var redirectIfLoggedIn = (nextState, replace, next) => {
  if (firebase.auth().currentUser) {
    replace('claims');
  }
  next();
}

export default (
  <Router history={hashHistory}>
    <Route path="/">
      <Route path="/claims" component={ClaimApp} onEnter={requireLogin}/>
      <Route path="/claimdetails" component={ClaimDetails} onEnter={requireLogin}/>
      <IndexRoute component={Login} onEnter={redirectIfLoggedIn} />
    </Route>
  </Router>
)
