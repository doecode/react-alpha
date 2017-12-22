import React from 'react';

export default class OrgMetadataDL extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {(this.props.data.primary_award && this.props.data.primary_award.toString().toUpperCase() !== "UNKNOWN") && <div className='row'>
          <div className='col-md-1'></div>
          <div className='col-md-5 col-xs-12'>Primary Award/Contract Number:</div>
          <div className='col-md-6 col-xs-12'>{this.props.data.primary_award}</div>
        </div>}
        {(this.props.data.award_numbers && this.props.data.award_numbers.length > 0) && <div className='row'>
          <div className='col-md-1'></div>
          <div className='col-md-5 col-xs-12'>Other Award/Contract Number:</div>
          <div className='col-md-6 col-xs-12'>
            {this.props.data.award_numbers.map((awardNum, index) => <div key={"award-" + index}>{awardNum}</div>)}
          </div>
        </div>}
        {(this.props.data.fwp_numbers && this.props.data.fwp_numbers.length > 0) && <div className='row'>
          <div className='col-md-1'></div>
          <div className='col-md-3 col-xs-12'>FWP Numbers:</div>
          <div className='col-md-8 col-xs-12'>
            {this.props.data.fwp_numbers.map((fwpnumbers, index) => <div key={"fwpNum-" + index}>{fwpnumbers}</div>)}
          </div>
        </div>}
        {(this.props.data.br_codes && this.props.data.br_codes.length > 0) && <div className='row'>
          <div className='col-md-1'></div>
          <div className='col-md-3 col-xs-12'>B&amp;R Codes:</div>
          <div className='col-md-8 col-xs-12'>
            {this.props.data.br_codes.map((brcodes, index) => <div key={"brcode-" + index}>{brcodes}</div>)}
          </div>
        </div>}
      </div>
    );
  }
}
