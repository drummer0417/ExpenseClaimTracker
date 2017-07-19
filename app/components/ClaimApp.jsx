var React = require('react');
var uuid = require('node-uuid');
var moment = require('moment');
import {connect} from 'react-redux';

import * as actions from 'actions';

import AddClaim from 'AddClaim';
import ClaimList from 'ClaimList';
import ClaimSearch from 'ClaimSearch';

export var ClaimApp = React.createClass({
  onLogout: function (e) {
    e.preventDefault();
      var {dispatch} = this.props;
      dispatch(actions.startLogout());
    },
  render: function() {

    return(
      <div>
        <div className="page-actions">
          <a href="#" onClick={this.onLogout}>logout</a>
        </div>

        <h1 className='page-title'>Expense Claim Tracker</h1>
        <div className='row'>
          <div className='column small-centered small-12 medium-8 large-7 '>
            <div className='container'>
              <ClaimSearch />
              <ClaimList />
              <AddClaim  />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default connect() (ClaimApp);
