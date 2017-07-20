import React from 'react';
import {connect} from 'react-redux';
import  moment from 'moment';

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
      var timestamp = moment().unix();
      var currentDate = moment.unix(timestamp).format('YYYY-MM-DD');
      console.log('currentDate: ', currentDate);
      return {
        status: 'New',
        claimDate: currentDate
      };
    }
  },
  render: function () {

    var claim = {};
    var id =  this.props.location.query.id;
    var claim = this.getClaim(id);
    var newStatus  = "";

    var setStatus = (e) => {
      newStatus = e.target.value;
      // this.refs.newStatus.value = e.target.value;
      console.log('newStatus:', newStatus);
    }

    var handleCancel = (e) => {
      e.preventDefault();
      window.location.hash = '/claims';
    }
    var handleSubmit = (e) => {
      e.preventDefault();

      var {dispatch} = this.props;
      var {number, description, amount, claimDate, invoiceDate} = this.refs;

      var prevStatus = claim && claim.status ? claim.status : 'new';
      newStatus = newStatus.length > 0 ? newStatus : prevStatus;
      console.log('newStatus before update:', newStatus);

      if (number.value.length < 1 || description.value.length < 1) {
        alert('At least enter a claim number and a description...')
      } else {
        var newClaim = {
          number: number.value,
          description: description.value,
          amount: amount.value,
          claimDate: claimDate.value,
          invoiceDate: invoiceDate.value,
          status: newStatus
        };
        if (claim.id) { // Update existing claim
          dispatch(actions.startUpdateClaim(claim.id, newClaim));
          console.log('claim updated: ', claim.description);
        } else { // Add new claim
          dispatch(actions.startAddClaim(newClaim));
          console.log('claim added: ', claim.description);
        }
        window.location.hash = '/claims';
      }
    }
    var renderStatus = () => {
      var isNew = claim.status === 'New';
      var isPendingApproval = claim.status === 'Pending Approval';
      var isApproved = claim.status === 'Approved';
      var isWividusInProgress = claim.status === 'Wividus - in progress';
      var isCompleted= claim.status === 'Completed';

      var statusses = ['New', 'Pending Approval', 'Approved','Wividus - in progress'];
      // var inputStatus = [];
      // statusses.forEach((status) => {
      //   inputStatus.push('<label><input className="radio" type="radio" name="status" ref="status" onClick={setStatus} defaultChecked={isNew} value="' + status + '"/><span className="radio-label">' + status + '</span></label>)');
      // });
      // console.log('inputStatus: ', inputStatus);
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
            <input type="radio" ref="status" name='status' onClick={setStatus} defaultChecked={isCompleted} value="Completed"/>
            <span className="radio-label">Completed</span>
          </label>
        </div>
      )
    }

    return(
      <div>
        <h1 className='page-title'>Claim Details</h1>
        <div className='row'>
          <div className='column small-centered small-12 medium-9 large-6 '>
            <div className='container'>
              <div className='container__footer'>
                <form name='form' onSubmit={handleSubmit}>
                  <label>
                    <span>Claim number</span>
                    <input type='text' ref='number' defaultValue={claim.number} placeholder='enter claim number...' autoFocus/>
                  </label>
                  <label>
                    <span>Description</span>
                    <input type='text' ref='description' defaultValue={claim.description} placeholder='enter description...' />
                  </label>
                  <label>
                    <span>Amount</span>
                    <input type='number' min="0.01" step="0.01" ref='amount' defaultValue={claim.amount} placeholder='Amount' />
                  </label>
                  <label>
                    <span>Invoice date (MM/DD/YYYY)</span>
                    <input type='date' ref='claimDate' defaultValue={claim.claimDate} placeholder='Invoice date' />
                  </label>
                  <label>
                    <span>Claim date (MM/DD/YYYY)</span>
                    <input type='date' ref='invoiceDate' defaultValue={claim.invoiceDate} placeholder='Claim date' />
                  </label>
                  {renderStatus()}
                  <div className='controls'>
                    <button className='button hollow primary expanded'>Save</button>
                    <button className='button hollow alert expanded' onClick={handleCancel}>Cancel</button>
                  </div>
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
