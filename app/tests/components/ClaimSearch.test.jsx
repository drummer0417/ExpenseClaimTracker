var expect = require('expect');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jQuery');

import {ClaimSearch} from 'ClaimSearch';

describe('ClaimSearch', () => {

  it('Should exist', () => {

    expect(ClaimSearch).toExist();
  });

  it('Should dispatch SET_SEARCH_TEXT on input change', ()=> {
    var searchText = 'new'
    var spy = expect.createSpy();
    var action = {
      type: 'SET_SEARCH_TEXT',
      searchText
    }
    var claimSearch = TestUtils.renderIntoDocument(<ClaimSearch dispatch={spy} />);

    claimSearch.refs.searchText.value = searchText;
    TestUtils.Simulate.change(claimSearch.refs.searchText);

    expect(spy).toHaveBeenCalledWith(action);
  });

  it('Should dispatch TOGGLE_SHOW_COMPLETED on input change', () => {
    var spy = expect.createSpy();
    var action = {
      type: 'TOGGLE_SHOW_COMPLETED'
    }
    var claimSearch = TestUtils.renderIntoDocument(<ClaimSearch dispatch={spy} />);

    claimSearch.refs.showCompleted.checked = true;
    TestUtils.Simulate.change(claimSearch.refs.showCompleted);

    expect(spy).toHaveBeenCalledWith(action);
  });
});
