var React = require ('react');
var {connect} = require('react-redux');

var actions = require('actions');

export var AddClaim = React.createClass({

  handleSubmit: function(e) {
    e.preventDefault();
    // var {dispatch} = this.props;
    // var text = this.refs.claimText.value;
    // if (text.length > 0) {
    //   this.refs.claimText.value= ''
    //   dispatch(actions.startAddClaim(text));
    // }
    window.location.hash = '#/claimdetails';
  },
  render: function (){
    return(
      <div className='container__footer' controls>
        <form name='form' onSubmit={this.handleSubmit}>
          {/* <input type='text' ref='claimText' placeholder='Wah gaduh gij doen?' autoFocus/> */}
          <button className='button expanded'>New Claim</button>
        </form>
      </div>
    )
  }
});

export default connect() (AddClaim);
