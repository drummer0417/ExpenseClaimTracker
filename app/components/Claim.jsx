var React = require('react');
var moment = require('moment');
var {connect} = require('react-redux');
var actions = require('actions');

export var Claim = React.createClass({

  // onToggleCompleted: function(id) {
  //     return (() => {
  //       this.props.onToggleCompleted(id)
  //     }
  //   )
  // },
  render: function () {
    var {description, id, number, claimDate, invoiceDate, status, dispatch} = this.props;
    var completed = status === 'completed';
    var claimClassName = completed? 'claim claim-completed': 'claim';

    var renderDate = () => {
      var message = 'Claim- / Invoiece date: ';
      // var timestamp = claimDate;
      // if (completed) {
      //   message = 'Completed: '
      //   timestamp = completedAt;
      // }
      // return message + moment.unix(timestamp).format('dd D-MM-YYYY - H:mm:ss');
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
