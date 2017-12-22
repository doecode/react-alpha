import React from 'react';
import ReactDOM from 'react-dom';
import {doAjax, doAuthenticatedAjax, appendQueryString, getQueryParam, setLoggedInAttributes} from '../utils/utils';
import UserData from '../stores/UserData';
import UserField from '../field/UserField';
import moment from 'moment';
const userData = new UserData();

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.parseLoginResponse = this.parseLoginResponse.bind(this);
    this.parseError = this.parseError.bind(this);
    this.triggerLogin = this.triggerLogin.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.addUsername = this.addUsername.bind(this);
    this.addPassword = this.addPassword.bind(this);
    this.state = {
      "email": "",
      "password": "",
      "hasError": false,
      "errorMsg": ""
    }
  }

  login() {
    doAjax("POST", "/doecode/api/user/login", this.parseLoginResponse, userData.getData(), this.parseError);
  }

  register() {
    window.location.href = '/doecode/register';
  }

  parseLoginResponse(data) {

    setLoggedInAttributes(data);
    if (window.sessionStorage.lastLocation) {
      let url = window.sessionStorage.lastLocation;
      window.sessionStorage.lastLocation = "";
      window.location.href = url;
    } else {
      window.location.href = "/doecode/projects";
    }
  }

  triggerLogin(event) {
    if (event.key === 'Enter') {
      this.login();
    }
  }

  parseError(data) {
    this.setState({
      "hasError": true, "errorMsg": <span>Invalid Username/Password. If you believe this to be in error, please contact&nbsp;<a href='mailto:doecode@osti.gov'>doecode@osti.gov</a>&nbsp;for further information.</span>
    });
  }

  forgotPassword() {
    window.location.href = '/doecode/forgot-password'
  }

  addUsername(event) {
    userData.setValue("email", event.target.value)
  }

  addPassword(event) {
    userData.setValue("password", event.target.value);
  }

  render() {

    return (
      <div className="row not-so-wide-row">
        <div className="col-lg-3 col-md-1 col-sm-1"></div>
        <div className="col-lg-6 col-md-10 col-sm-10 col-xs-12 ">
          <div>
            <br/>
            <h2 className="static-content-title">Sign In</h2>
            <br/> {this.state.hasError && <div className='center-text'>
              <span className="error-color">
                <label>{this.state.errorMsg}</label>
              </span>
            </div>}
          </div>
          <div className='row'>
            <div className='col-xs-12 register-text'>
              If you already have a DOE CODE account, enter your email address and password below to sign in. If you wish to create an account, please select "Create Account" and follow the instructions provided
            </div>
          </div>
          <br/> {/*EMail Address*/}
          <div className='row login-email-container'>
            <div className='col-md-2 col-xs-12 right-text-md right-text-lg no-col-padding-right '>
              <label className='control-label input-label-adjusted' htmlFor='email-address'>Email Address:</label>&nbsp;<span className='hide-md hide-lg'>
                <label className='control-label input-label-adjusted text-muted'>(required)</label>
              </span>
            </div>
            <div className='col-md-5 col-xs-12'>
              <div className='form-group'>
                <input title='Email Address' type='text' placeholder='Email Address' id='email-address' className='pure-input-1-3 form-control login-input-box' onKeyPress={this.triggerLogin} onChange={this.addUsername} onBlur={this.addUsername}/>
              </div>
            </div>
            <div className='col-md-2 left-text col-xs-12 no-col-padding-left hide-xs hide-sm'>
              <label className='control-label input-label-adjusted text-muted'>(required)</label>
            </div>
          </div>
          {/*Password*/}
          <div className='row signin-page-container'>
            <div className='col-md-2 col-xs-12 right-text-md right-text-lg no-col-padding-right'>
              <label className='control-label input-label-adjusted' htmlFor='password'>Password:</label>&nbsp;<span className='hide-md hide-lg'>
                <label className='control-label input-label-adjusted text-muted'>(required)</label>
              </span>
            </div>
            <div className='col-md-5 col-xs-12'>
              <div className='form-group'>
                <input title='Password' type='password' placeholder='Password' id='password' className='pure-input-1-3 form-control login-input-box' onKeyPress={this.triggerLogin} onChange={this.addPassword} onBlur={this.addPassword}/>
              </div>
            </div>
            <div className='col-md-2 left-text col-xs-12 no-col-padding-left hide-xs hide-sm'>
              <label className='control-label input-label-adjusted text-muted'>(required)</label>
            </div>
            <div className='col-xs-12'>
              <br/>
              <br/>
            </div>
          </div>
          <br/>
          <div className='row'>
            <div className='col-lg-3 col-md-3 col-sm-2 col-xs-12  signin-buttons-container'>
              <button title='Forgot Password Page' type='button' className='pure-button signin-buttons' onClick={this.forgotPassword}>Forgot Password?</button>
            </div>
            <div className='col-lg-4 col-md-4 col-sm-4'></div>
            <div className='col-lg-3 col-md-3 col-sm-3 col-xs-12  signin-buttons-container right-text-lg right-text-md right-text-sm'>
              <button title='Create Account Page' type='button' className='pure-button signin-buttons' onClick={this.register}>Create Account</button>
            </div>
            <div className='col-lg-2 col-md-2 col-sm-3 col-xs-12  signin-buttons-container'>
              <button title='Sign In' type='button' className='pure-button button-success signin-buttons' onClick={this.login}>Sign In</button>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-1 col-sm-1"></div>
      </div>
    );
  }
}
