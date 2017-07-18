var expect = require('expect');
var React = require('react');
var {Provider} = require('react-redux');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jQuery');

var configureStore = require('configureStore');
import {ClaimApp} from 'ClaimApp';

// var ClaimList = require('ClaimList') // ------- replace this require by import to be able to
//                                       ------- grab the defalt (export default....)
import ClaimList from 'ClaimList';

beforeEach(() => {
  localStorage.removeItem('claims');
});

describe('ClaimApp', () => {

  it('Should exist', () => {

    expect(ClaimApp).toExist();
  });

  it('Should render ClaimList', () => {

    var store = configureStore.configure();
    var provider = TestUtils.renderIntoDocument(
      <Provider store={store}>
        <ClaimApp />
      </Provider>
    )

    // grab ClaimList component ane make sure it exists
    // first grab the ClaimApp component from provider
    var claimApp = TestUtils.scryRenderedComponentsWithType(provider, ClaimApp)[0];
    // next grab the ClaimList component from ClaimApp
    var claimList = TestUtils.scryRenderedComponentsWithType(claimApp, ClaimList);

    expect(claimList.length).toBe(1);
  });
});
