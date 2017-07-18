import React from 'react';
import * as redux from 'react-redux';

import * as actions from 'actions';

export var Login = React.createClass({

  onLogin(e) {
    e.preventDefault();
    var {dispatch} = this.props;
    dispatch(actions.startLogin());
  },
  render() {
    var {auth} = this.props;
    return (
      <div>
        <h1 className="page-title">Claim App</h1>;
        <div className="row">
          <div className="column small-centered small-12 medium-6 large-4 ">
            <div className="callout callout-auth">
              <h3>Login</h3>
              <p>Login with your Github account</p>
              <button className="button" onClick={this.onLogin}>Login</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

export default redux.connect((state) => {
  return state
})  (Login);
