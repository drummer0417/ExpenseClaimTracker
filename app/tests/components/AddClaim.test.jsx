var expect = require('expect');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jQuery');

import  {AddClaim} from 'AddClaim';
import * as actions from 'actions';

describe('AddClaim', () => {

  it('Should exist', () => {

    expect(AddClaim).toExist();
  });

  it('Should dispatch ADD_CLAIM when valid claimText entered', () => {
    var spy = expect.createSpy();
    var claimText = 'This is a new Claim';
    var action = actions.startAddClaim(claimText);

    var addClaim = TestUtils.renderIntoDocument(<AddClaim dispatch={spy} />);
    var $el = $(ReactDOM.findDOMNode(addClaim));

    addClaim.refs.claimText.value = claimText;

    TestUtils.Simulate.submit($el.find('form')[0]);

    expect(spy).toHaveBeenCalledWith(action);

  })

  it('Should not dispatch ADD_CLAIM when invalid claimText entered', () => {
    var spy = expect.createSpy();

    var addClaim = TestUtils.renderIntoDocument(<AddClaim dispatch={spy} />);
    var $el = $(ReactDOM.findDOMNode(addClaim));

    addClaim.refs.claimText.value = "";

    TestUtils.Simulate.submit($el.find('form')[0]);

    expect(spy).toNotHaveBeenCalled();
  })


});
