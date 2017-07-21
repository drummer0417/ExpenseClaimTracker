var React = require('react');
var moment = require('moment');
var {connect} = require('react-redux');
var actions = require('actions');

export var Claim = React.createClass({

  render: function () {
    var {description, id, number, claimDate, invoiceDate, status, dispatch} = this.props;
    var completed = status === 'Completed';
    var claimClassName = completed? 'claim claim-completed': 'claim';

    var renderDate = () => {
      var message = 'Claim- / Invoiece date: ';
      return message + claimDate + " / " + invoiceDate;
    };

    return (
      // <div onClick={this.onToggleCompleted(id)}>
      <div className={claimClassName} onClick={() => {
          window.location.hash = `/claimdetails?id=${id}`;
        }}>
        <div>
          <input type='checkbox' checked={completed} />
        </div>
        <div>
          <p className='claim__text'>{number}: {description} / Status: {status}</p>
          <p className='claim__subtext'>{renderDate()}</p>
        </div>
      </div>
    );
  }
});

export default connect() (Claim);
