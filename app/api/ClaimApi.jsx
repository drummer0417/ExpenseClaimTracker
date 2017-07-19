var $ = require('jquery');

var filterClaims = function(claims, showCompleted, searchText){

searchText = searchText?  searchText.toLowerCase() : "";

// filter first
  var filteredClaims = claims.filter((claim) => {
      return showCompleted || claim.status !== 'Completed' ;
  });

  // filter on searchText
  filteredClaims = filteredClaims.filter((claim) => {
    if (!searchText || searchText.length == 0 ) {
      return true;
    } else if (claim.description.toLowerCase().indexOf(searchText) === -1 &&
               claim.number.toLowerCase().indexOf(searchText) === -1)
    {
      return false;
    } else {
      return true;
    }
  });

  // then sort
  filteredClaims.sort((a, b) => {
    if (a.status !== 'Completed' && b.status === 'Completed') {
      return -1;
    } else if (a.status === 'Completed' && b.status !== 'Completed') {
      return 1;
    } else { // a.Completed and b.Completed are equal

      // var sortDateA = a.Completed? a.CompletedAt: a.createdAt;
      // var sortDateB = b.Completed? b.CompletedAt: b.createdAt;
      var sortDateA = a.status === 'Completed'? a.claimDate: a.claimDate;
      var sortDateB = b.status === 'Completed'? b.claimDate: b.claimDate;

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
