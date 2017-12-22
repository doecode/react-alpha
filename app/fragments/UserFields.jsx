import React from 'react';
import ReactDOM from 'react-dom';
import UserData from '../stores/UserData';
import UserField from '../field/UserField';
import Validation from '../utils/Validation';
import {doAjax} from '../utils/utils';

const userData = new UserData();
const validation = new Validation();

export default class UserFields extends React.Component {
  constructor(props) {
    super(props);
    this.updateFirstName = this.updateFirstName.bind(this);
    this.updateLastName = this.updateLastName.bind(this);
    this.updateEmailAndCheckPassword = this.updateEmailAndCheckPassword.bind(this);
    this.handleContractNeedCheck = this.handleContractNeedCheck.bind(this);
    this.handleContractNeedCheckError = this.handleContractNeedCheckError.bind(this);
    this.handleContractCheck = this.handleContractCheck.bind(this);
    this.checkEmailAndContractNum = this.checkEmailAndContractNum.bind(this);
    this.handleContractValidationBlur = this.handleContractValidationBlur.bind(this);
    this.handleContractValidation = this.handleContractValidation.bind(this);
    this.handleContractValidationError = this.handleContractValidationError.bind(this);

    this.state = {
      showContractNumber: this.props.showContractNumAlways !== undefined,
      isValidContractNum: undefined
    }
  }

  updateFirstName(event) {
    userData.setValue("first_name", event.target.value);
    this.setState({});
  }

  updateLastName(event) {
    userData.setValue("last_name", event.target.value);
    this.setState({});
  }

  updateEmailAndCheckPassword(event) {
    userData.setValue("email", event.target.value);
    this.props.checkPasswordCallback();
  }

  checkEmailAndContractNum(event) {
    if ((validation.validateEmail(event.target.value) === "") && event.target.value.trim()) {
      doAjax('GET', '/doecode/api/user/getsitecode/' + event.target.value, this.handleContractNeedCheck, null, this.handleContractNeedCheckError);
    } else {
      this.setState({showContractNumber: false});
    }
  }

  handleContractNeedCheck(data) {
    var needingDatContractNumber = data.site_code === 'CONTR';
    var new_state = {
      showContractNumber: needingDatContractNumber
    };
    this.setState(new_state);
  }

  handleContractNeedCheckError(data) {
    this.setState({showContractNumber: false});
  }

  handleContractCheck(event) {
    var contractNum = event.target.value.trim();
    userData.setValue("contract_number", contractNum);
    this.setState({});
  }

  handleContractValidationBlur(event) {
    var contractNum = event.target.value.trim();
    if (contractNum != '') {
      //Check for valid contract number
      doAjax('GET', ('/doecode/api/validation/awardnumber?value=' + contractNum), this.handleContractValidation, null, this.handleContractValidationError);
    } else {
      this.setState({isValidContractNum: undefined});
    }
  }

  handleContractValidation(data) {
    if (data.value == 'OK') {
      this.setState({isValidContractNum: true});
    }
  }

  handleContractValidationError(data) {
    this.setState({isValidContractNum: false});
  }

  render() {
    const emailSmalltext = <span>If you are an employee at a DOE National Laboratory, please register using your official .gov email address.</span>;
    const has_firstName = userData.getValue("first_name") != '' || localStorage.first_name != '';
    const has_lastName = userData.getValue("last_name") != '' || localStorage.last_name != '';

    var firstNameValue = (userData.getValue("first_name"))
      ? userData.getValue("first_name")
      : localStorage.first_name;
    var lastNameValue = (userData.getValue("last_name"))
      ? userData.getValue("last_name")
      : localStorage.last_name;

    const has_email = userData.getValue("email") != '';
    const successCheck = <span className="fa fa-check form-control-feedback successCheck"></span>;
    const errorX = <span className="fa fa-times form-control-feedback successCheck"></span>;
    const successDiv = 'form-group has-success has-feedback';
    const errorDiv = 'form-group has-error has-feedback';
    const notSuccess = 'form-group';
    const labelClass = 'col-md-4 col-xs-12 right-text-md right-text-lg no-col-padding-right no-col-padding-left ';

    const emailError = (userData.getValue("email"))
      ? validation.validateEmail(userData.getValue("email"))
      : '';
    const hasEmailError = (emailError !== '');

    //Contract Styles validation
    var contractLabel = '';
    var contractValue = '';
    var contractStatus = '';
    if (this.state.isValidContractNum === undefined) {
      contractLabel = labelClass;
      contractValue = notSuccess;
      contractStatus = null;
    } else if (this.state.isValidContractNum === true) {
      contractLabel = labelClass + ' has-success';
      contractValue = successDiv;
      contractStatus = successCheck;
    } else if (this.state.isValidContractNum === false) {
      contractLabel = labelClass + ' has-error';
      contractValue = errorDiv;
      contractStatus = errorX;
    }

    return (
      <div className='row'>
        <div className='col-xs-12 '>
          {/*First Name*/}
          <div className='row login-email-container'>
            <div className={has_firstName
              ? labelClass + ' has-success'
              : labelClass}>
              <label className='control-label input-label-adjusted' htmlFor='first-name'>First Name:</label>
            </div>
            <div className='col-md-6 col-xs-12'>
              <div className={(has_firstName)
                ? (successDiv)
                : (notSuccess)}>
                <input title='First Name' type='text' placeholder='First Name' value={firstNameValue} id='first-name' className='pure-input-1-3 form-control' onChange={this.updateFirstName} onBlur={this.updateFirstName}/> {has_firstName && <span className="fa fa-check form-control-feedback successCheck"></span>}
              </div>
            </div>

          </div>
          {/*Last Name*/}
          <div className='row login-email-container'>
            <div className={has_lastName
              ? labelClass + ' has-success'
              : labelClass}>
              <label className='control-label input-label-adjusted' htmlFor='last-name'>Last Name:</label>
            </div>
            <div className='col-md-6 col-xs-12'>
              <div className={(has_lastName)
                ? (successDiv)
                : (notSuccess)}>
                <input title='Last Name' type='text' placeholder='Last Name' value={lastNameValue} id='last-name' className='pure-input-1-3 form-control' onChange={this.updateLastName} onBlur={this.updateLastName}/> {has_lastName && <span className="fa fa-check form-control-feedback successCheck"></span>}
              </div>
            </div>
          </div>
          {/*Email Address*/}
          {this.props.show_email && <div className='row login-email-container'>
            <div className={(has_email && !hasEmailError)
              ? labelClass + ' has-success'
              : labelClass}>
              <label className='control-label input-label-adjusted' htmlFor='email'>Email Address:</label>
            </div>
            <div className='col-md-6 col-xs-12'>
              <div className={(has_email && !hasEmailError)
                ? (successDiv)
                : (notSuccess)}>
                <input title='Email Address' type='text' placeholder='Email Address' id='email' className='pure-input-1-3 form-control' onChange={this.checkEmailAndContractNum} onBlur={this.updateEmailAndCheckPassword}/> {(has_email && !hasEmailError) && <span className="fa fa-check form-control-feedback successCheck"></span>}
                {hasEmailError && <div className='has-error'>
                  <label className='control-label'>{emailError}</label>
                </div>}
                <span>If you are an employee at a DOE National Laboratory, please register using your official .gov email address.</span>
              </div>
            </div>
          </div>}
          {/*Contract Number*/}
          {this.state.showContractNumber && <div className='row login-email-container'>
            <div className={contractLabel}>
              <label className='control-label input-label-adjusted' htmlFor='contract-number'>Award/Contract Number:</label>
            </div>
            <div className='col-md-6 col-xs-12'>
              <div className={contractValue}>
                <input title='Contract Number' type='text' placeholder='Award/Contract Number' id='contract-number' value={userData.getValue("contract_number")} className='pure-input-1-3 form-control' onChange={this.handleContractCheck} onBlur={this.handleContractValidationBlur}/> {contractStatus}
              </div>
            </div>
          </div>}
        </div>
      </div>
    );
  }
}
