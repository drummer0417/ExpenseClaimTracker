var $ = require('jquery');

var filterClaims = function(claims, showCompleted, searchText){

searchText = searchText?  searchText.toLowerCase() : "";

// filter first
  var filteredClaims = claims.filter((claim) => {
      return showCompleted || claim.status !== 'completed' ;
  });

  // filter on searchText
  filteredClaims = filteredClaims.filter((claim) => {
    if (!searchText || searchText.length == 0 ) {
      return true;
    } else if (claim.text.toLowerCase().indexOf(searchText) === -1) {
      return false;
    } else {
      return true;
    }
  });

  // then sort
  filteredClaims.sort((a, b) => {
    if (a.status !== 'completed' && b.status === 'completed') {
      return -1;
    } else if (a.status === 'completed' && b.status !== 'completed') {
      return 1;
    } else { // a.completed and b.completed are equal

      // var sortDateA = a.completed? a.completedAt: a.createdAt;
      // var sortDateB = b.completed? b.completedAt: b.createdAt;
      var sortDateA = a.status === 'completed'? a.claimDate: a.claimDate;
      var sortDateB = b.status === 'completed'? b.claimDate: b.claimDate;

      if (sortDateA > sortDateB) {
        return -1;
      } else if (sortDateA < sortDateB){
        return 1;
      } else {
        return 0;
      }
    }
  });

  return filteredClaims;
}

module.exports = {filterClaims};
