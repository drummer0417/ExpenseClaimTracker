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
    // e.preventDefault();
    // var {dispatch} = this.props;
    // var {number, description, claimDate, invoiceDate, newStatus} = this.refs;
    // console.log('status::::', newStatus.value);
    // if (number.value.length > 0) {
    //   alert('Enter a claim number...')
    // } else {
    //   if (claim.id) {
    //
    //   }
    //   var claim = {
    //     number: number.value,
    //     description: description.value,
    //     claimDate: claimDate.value,
    //     invoiceDate: invoiceDate.value,
    //     status: newStatus
    //   };
    //   // dispatch(actions.startAddClaim(claim));
    //   // window.location.hash = '/claims';
    // }
  },
  render: function () {

    var claim = {};
    var id =  this.props.location.query.id;
    var claim = this.getClaim(id);
console.log('claim just after getClaim', claim);
    var newStatus;
    var setStatus = (e) => {
      this.refs.newStatus.value = e.target.value;
      console.log('newStatus:', this.refs.newStatus.value);
    }

    var handleSubmit = (e) => {
      e.preventDefault();
      console.log('claim::::::::::::::::::::::::', claim);

      var {dispatch} = this.props;
      var {number, description, amount, claimDate, invoiceDate, newStatus} = this.refs;

      var prevStatus = claim && claim.status ? claim.status : 'new';
      var newStatusValue = newStatus.value.length > 0 ? newStatus.value : prevStatus;
      console.log('newStatus:', newStatusValue);

      if (number.value.length < 1) {
        alert('Enter a claim number...')
      } else {
        if (claim.id) {
          var newClaim = {
            number: number.value,
            description: description.value,
            amount: amount.value,
            claimDate: claimDate.value,
            invoiceDate: invoiceDate.value,
            status: newStatusValue
          };
          dispatch(actions.startUpdateClaim(claim.id, newClaim));
          window.location.hash = '/claims';
        }
        // dispatch(actions.startAddClaim(claim));
        // window.location.hash = '/claims';
      }
    }
    var renderStatus = () => {
      var isNew = claim.status === 'New';
      var isPendingApproval = claim.status === 'Pending Approval';
      var isApproved = claim.status === 'Approved';
      var isWividusInProgress = claim.status === 'Wividus - in progress';
      var isCompleted= claim.status === 'Completed';
      return(
        <div className="status">
          <p>Status</p>
          <label>
            <input className="radio" type="radio" name='status' ref="status" onClick={setStatus} defaultChecked={isNew} value="New"/>
            <span className="radio-label">New</span>
          </label>
          <label>
            <input className="radio" type="radio" name='status' ref="status" onClick={setStatus} defaultChecked={isPendingApproval} value="Pending Approval"/>
            <span className="radio-label">Pending Approval</span>
          </label>
          <label>
            <input className="radio" type="radio" name='status' ref="status"  onClick={setStatus} defaultChecked={isApproved} value="Approved"/>
            <span className="radio-label">Approved</span>
          </label>
          <label>
            <input className="radio" type="radio" name='status' ref="status" onClick={setStatus} defaultChecked={isWividusInProgress} value="Wividus - in progress"/>
            <span className="radio-label">Wividus - in progress</span>
          </label>
          <label>
            <input  type="radio" ref="status" name='status' onClick={setStatus} defaultChecked={isCompleted} value="Completed"/>
            <span className="radio-label">Completed</span>
          </label>
          <input type="hidden" ref="newStatus"/>
        </div>
      )
    }

    return(
      <div>
        <h1 className='page-title'>Claim Details</h1>
        <div className='row'>
          <div className='column small-centered small-12 medium-11 large-5 '>
            <div className='container'>
              <div className='container__footer'>
                <form name='form' onSubmit={handleSubmit}>
                  <input type='text' ref='number' defaultValue={claim.number} placeholder='Number' autoFocus/>
                  <input type='text' ref='description' defaultValue={claim.description} placeholder='Description' />
                  <input type='text' ref='claimDate' defaultValue={claim.claimDate} placeholder='Invoice date' />
                  <input type='text' ref='amount' defaultValue={claim.amount} placeholder='Amount' />
                  <input type='text' ref='invoiceDate' defaultValue={claim.invoiceDate} placeholder='Claim date' />
                  {renderStatus()}
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
