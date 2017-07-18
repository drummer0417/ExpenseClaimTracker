var expect = require('expect');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jQuery');
import {Provider} from 'react-redux';
// var ClaimList = require('ClaimList'); ------- replace this require by import to be able to
//                                     ------- grab the defalt (export default....)
// var Claim = require('Claim');
import {configure} from 'configureStore';
import ConnectedClaimList, {ClaimList} from 'ClaimList';
import ConnectedClaim, {Claim} from 'Claim';

describe('ClaimList', () => {

  it('Should exist', () => {
    expect(ClaimList).toExist();
  });

  it('Should render 5 claim items', () => {
    // create mock data
    var claims =  [
      { id: 1, text: 'Cycle to Best - Oirschot - FB', completed: false, completedAt: undefined, createdAt: 500 },
      { id: 2, text: 'Get a coffee', completed: false, completedAt: undefined, createdAt: 500 },
      { id: 3, text: 'Bikes to Patrick', completed: false, completedAt: undefined, createdAt: 500 },
      { id: 4, text: 'Car to KwikFit to fix tire', completed: false, completedAt: undefined, createdAt: 500 },
      { id: 5, text: 'Get cheep beers from EmTe', completed: false, completedAt: undefined, createdAt: 500 },
    ];
    var store = configure({claims});
    // var claimList = TestUtils.renderIntoDocument(<ClaimList claims={claims}/>);
    // var claimComponents = TestUtils.scryRenderedComponentsWithType(claimList, Claim);
    var provider = TestUtils.renderIntoDocument(
      <Provider store={store}>
        <ConnectedClaimList />
      </Provider>
    );

    var claimList = TestUtils.scryRenderedComponentsWithType(provider, ConnectedClaimList)[0];
    var claimComponents = TestUtils.scryRenderedComponentsWithType(claimList, ConnectedClaim);

    expect(claimComponents.length).toBe(5);

  });

  it('Should render "No claim\'s" message if no claims to display', () => {
    // create mock data
    var claims =  [];
    var claimList = TestUtils.renderIntoDocument(<ClaimList claims={claims}/>);
    var $el = $(ReactDOM.findDOMNode(claimList));

    expect($el.find('.container__message').length).toBe(1);
  });
});
