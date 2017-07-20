import React from 'react';
import * as redux from 'react-redux';

import * as actions from 'actions';

export var Login = React.createClass({

  handleLoginError(error) {
    // console.log('Login error, code / messsage', error.code, ' / \n', error.message);
    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
      alert('Error! \n\nemail address unknow or password invalid');
    } else {
      alert(error.message);
    }
  },
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
  onSignUp(e) {
    e.preventDefault();
    var {dispatch} = this.props;

    var email = this.refs.newEmail.value;
    var password = this.refs.newPassword.value;
    if (password != this.refs.verifyNewPassword.value) {
      alert('Passwords do not match');
    } else {
      dispatch(actions.signUp(email, password)).then((result) =>{

      }, (error) => {
        this.handleLoginError(error);
      }).catch((error) => {
        // Handle Errors here.
        this.handleLoginError(error);
      });
    }
  },
  onEctLogin (e) {
    e.preventDefault();
    var {dispatch} = this.props;

    var email = this.refs.email.value;
    var password = this.refs.password.value;
    if (email.length === 0 || password.length === 0) {
        alert('Enter a value for email address and password');
    } else {
      dispatch(actions.ectLogin(email, password)).then((result) =>{

      }, (error) => {
        this.handleLoginError(error);
      }).catch((error) => {
        // Handle Errors here.
        this.handleLoginError(error);
      })
    }
  },
  render() {
    var {auth} = this.props;
    return (
      <div>
        <h1 className="page-title">Expense Claim Tracker</h1>;
        <div className="row">
          <div className="column small-centered small-12 medium-7 large-6 ">
            <div className="callout callout-auth">
              <h1>Login</h1>
              <div>
                <h5>Login with your Expense Claim Tracker credentials</h5>
                <input type='text' ref='email' placeholder='enter email address' />
                <input type='password' ref='password' placeholder='enter password' />
                <button className="button" onClick={this.onEctLogin}>Login</button>
              </div>
              <hr/>
              <div>
                <h5>Or Sign up</h5>
                <input type='text' ref='newEmail' placeholder='enter email address' />
                <input type='password' ref='newPassword' placeholder='enter password' />
                <input type='password' ref='verifyNewPassword' placeholder='verify password' />
                <button className="button" onClick={this.onSignUp}>Sign up</button>
              </div>
              <hr/>
              <h5>Or login with your favourite account</h5>
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
