import React from 'react';
import * as redux from 'react-redux';

import * as actions from 'actions';

export var Login = React.createClass({

  handleLoginError(error) {
    // console.log('Login error, code / messsage', error.code, ' / \n', error.message);
    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
      alert('Error! \n\nemail address unknow or password invalid');
    } else {
      alert('Error! \n\n' + error.message);
    }
  },
  onGitLogin(e) {
    e.preventDefault();
    var {dispatch} = this.props;
    dispatch(actions.starGitLogin()).then((result) =>{
    }, (error) => {
      this.handleLoginError(error);
    }).catch((error) => {
      // Handle Errors here.
      this.handleLoginError(error);
    });
  },
  onPressEnterLogin(e) {
    console.log('onPressEnterLogin');
    if(e.key === 'Enter') {
      this.onEctLogin(e)
    }
  },
  onPressEnterSignUp(e) {
    console.log('onPressEnterSignUp');
    if(e.key === 'Enter') {
      this.onSignUp(e)
    }
  },
  onFBLogin(e) {
    e.preventDefault();
    var {dispatch} = this.props;
    dispatch(actions.startFBLogin()).then((result) =>{
    }, (error) => {
      throw error;
    }).catch((error) => {
      // Handle Errors here.
      this.handleLoginError(error);
    });
  },
  onSignUp(e) {
    e.preventDefault();
    var {dispatch} = this.props;

    var email = this.refs.newEmail.value;
    var password = this.refs.newPassword.value;
    if (password != this.refs.verifyNewPassword.value) {
    this.handleLoginError({message: 'Passwords do not match'});
    } else {
      dispatch(actions.signUp(email, password)).then((result) =>{
      }, (error) => {
        throw error;
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
        this.handleLoginError({message: 'Enter an email address and a password'});
    } else {
      dispatch(actions.ectLogin(email, password)).then((result) =>{
        // login ok
      }, (error) => {
        throw error;
      }).catch((error) => {
        // Handle Errors here.
        this.handleLoginError(error);
      })
    }
  },
  onPasswordReset(e) {
    e.preventDefault();
    var {dispatch} = this.props;

    var email = this.refs.email.value;
    if (email.length === 0) {
        this.handleLoginError({message: 'Enter an email address in the email field above'});
    } else {
      dispatch(actions.passwordReset(email)).then((result) =>{
        alert(`Info:\n\nA password reset email was sent to '${email}'`)
      }, (error) => {
        throw error;
      }).catch((error) => {
        if (error.code === 'auth/user-not-found') {
          this.handleLoginError({message: `Email address '${email}' is unkwon.\nCheck email address and try again.`});
          // this.handleLoginError({message: 'Passwords do not match'});
        } else {
          this.handleLoginError(error);
        }
      });
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
              <h5>Login with your Expense Claim Tracker credentials</h5>
              <div className="login-border">
                <input type='text' ref='email' placeholder='enter email address' onKeyPress={this.onPressEnterLogin} autoFocus />
                <input type='password' ref='password' placeholder='enter password' onKeyPress={this.onPressEnterLogin} />
                <button className="button" onClick={this.onEctLogin}>Login</button>
                <p><a onClick={this.onPasswordReset}>Forgot my password</a></p>
              </div>
              <h5>or Sign up</h5>
              <div className="login-border">
                <input type='text' ref='newEmail' placeholder='enter email address' onKeyPress={this.onPressEnterSignUp} />
                <input type='password' ref='newPassword' placeholder='enter password' onKeyPress={this.onPressEnterSignUp} />
                <input type='password' ref='verifyNewPassword' placeholder='verify password' onKeyPress={this.onPressEnterSignUp}/>
                <button className="button" onClick={this.onSignUp}>Sign up</button>
              </div>
              <h5>or login with your favourite social account</h5>
              <div className="login-border">
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
