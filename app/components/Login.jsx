import React from 'react';
import * as redux from 'react-redux';

import * as actions from 'actions';

export var Login = React.createClass({

  onGitLogin(e) {
    e.preventDefault();
    var {dispatch} = this.props;
    dispatch(actions.starGitLogin());
  },
  onFBLogin(e) {
    e.preventDefault();
    var {dispatch} = this.props;
    dispatch(actions.startFBLogin());
  },
  render() {
    var {auth} = this.props;
    return (
      <div>
        <h1 className="page-title">Claim App</h1>;
        <div className="row">
          <div className="column small-centered small-12 medium-7 large-6 ">
            <div className="callout callout-auth">
              <h3>Login</h3>
              <p>Login with your favourite account</p>
              <div>
                <button className="button" onClick={this.onFBLogin}>Login with Facebook</button>
                <button className="button" onClick={this.onGitLogin}>Login with Github</button>
              </div>

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
