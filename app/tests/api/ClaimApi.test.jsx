var expect = require('expect');

var ClaimApi = require('ClaimApi');

beforeEach(() => {
  localStorage.removeItem('claims');
});

describe('ClaimApi', () => {

  it('Should exist', () => {

    expect(ClaimApi).toExist();
  })

  describe('FilterClaims', () => {

    var claims  = [
      {id: 1, text: 'some text here', completed: true},
      {id: 2, text: 'other Text' , completed: false},
      {id: 3, text: 'and even more text here', completed: true}
    ];

     it('Should return all values if completed is true', () => {
       var filteredClaims = ClaimApi.filterClaims(claims, true, '');
       expect(filteredClaims.length).toBe(3);
     });

     it('Should only return totos if completed is false', () => {
       var filteredClaims = ClaimApi.filterClaims(claims, false, '');
       expect(filteredClaims.length).toBe(1);
     });

     it('Should sort by completed, not completed first', () => {
       var filteredClaims = ClaimApi.filterClaims(claims, true, '');
       expect(filteredClaims[0].completed).toBe(false);
     });

     it('Should return all claims if searchText is empty', () => {
       var filteredClaims = ClaimApi.filterClaims(claims, true, '');
       expect(filteredClaims.length).toBe(3);
     })

     it('Should return all claims if searchText is empty', () => {
       var filteredClaims = ClaimApi.filterClaims(claims, true, '');
       expect(filteredClaims.length).toBe(3);
     })

     it('Should return all claims with searchText equal to the given searchText', () => {
       var filteredClaims = ClaimApi.filterClaims(claims, true, 'OTHER Text');
      //  expect(filteredClaims.length).toBe(1);
       expect(filteredClaims[0].text).toBe('other Text');
     })
   });
});
