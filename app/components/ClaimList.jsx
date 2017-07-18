var React = require('react');
var {connect} = require('react-redux');

// var Claim = require('Claim');         ------- replace this require by import to be able to
//                                     ------- grab the defalt (export default....)
import Claim from 'Claim';
import ClaimApi from 'ClaimApi';
import AddClaim from 'AddClaim';

export var ClaimList = React.createClass({

  render: function () {
    var {claims, showCompleted, searchText, auth} = this.props;

    var renderClaims = () => {
      // console.log('uid::::::::: ', auth.uid);
      var filteredClaims = ClaimApi.filterClaims(claims, showCompleted, searchText);
      if (filteredClaims.length === 0) {
        return<p className="container__message">No claims...</p>
      }
      return filteredClaims.map((claim) => {
        return (<Claim key={claim.id} {...claim} />)
      });
    };

    return (
      <div name='claim'>
        {renderClaims()}
      </div>
    );
  }
});

export default connect((state) => {
  return state
}) (ClaimList);
