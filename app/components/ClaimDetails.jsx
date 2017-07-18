import React from 'react';
import {connect} from 'react-redux';

import * as actions from 'actions';

export var ClaimDetails = React.createClass({
  getClaim: function(id){
    if (id) {
      console.log('props.claims: ', this.props.claims);
      var aClaim = this.props.claims.filter((claim) => {
        return claim.id === id;
      })
      return aClaim[0];
    } else {
      return {};
    }
  },
  handleSubmit: function(e){
    e.preventDefault();
    var {dispatch} = this.props;
    var {claimNumber, description, claimDate, invoiceDate} = this.refs;

    if (claimNumber.value.length > 0) {
      var claim = {
        number: claimNumber.value,
        description: description.value,
        claimDate: claimDate.value,
        invoiceDate: invoiceDate.value,
        status: "new"
      };
      dispatch(actions.startAddClaim(claim));
      window.location.hash = '/claims';
    } else {
      alert('Enter a claim number...')
    }
  },
  render: function () {
    var claim = this.getClaim(this.props.location.query.id);

    return(
      <div>
        <h1 className='page-title'>Claim Details</h1>
        <div className='row'>
          <div className='column small-centered small-12 medium-11 large-5 '>
            <div className='container'>
              <div className='container__footer'>
                <form name='form' onSubmit={this.handleSubmit}>
                  <input type='text' ref='claimNumber' value={claim.number} placeholder='number' autoFocus/>
                  <input type='text' ref='description' value={claim.description} placeholder='description' />
                  <input type='text' ref='claimDate' value={claim.claimDate} placeholder='invoice date' />
                  <input type='text' ref='invoiceDate' value={claim.invoiceDate} placeholder='claim date' />
                  <label>
                    <input className="radio" type="radio" name="myRadioInput" value="New"/>
                    <span>New</span>
                  </label>
                  <label>
                    <input className="radio" type="radio" name="myRadioInput" value="PendingApproval"/>
                    <span>Pending Approval</span>
                  </label>
                  <label>
                    <input className="radio" type="radio" name="myRadioInput" value="Payed"/>
                    <span>Payed</span>
                  </label>
                  <button className='button expanded'>Save</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

export default connect((state) => {
  return state
})  (ClaimDetails);
