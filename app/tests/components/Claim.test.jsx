var expect = require('expect');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jQuery');

var actions = require('actions');
var {Claim} = require('Claim');

describe('Claim', () => {

  it('Should exist', () => {

    expect(Claim).toExist();
  });

  it('Should call dispatch toggleClaim action on click', () => {
    var spy = expect.createSpy();
    var claimItem = {id: 14, text: 'a Text', completed: false, completedAt: '321'};
    var action = actions.startToggleClaim(claimItem.id, !claimItem.completed);

    var claim = TestUtils.renderIntoDocument(<Claim {...claimItem} dispatch={spy} />);
    var $el = $(ReactDOM.findDOMNode(claim));

    TestUtils.Simulate.click($el[0]);

    expect(spy).toHaveBeenCalledWith(action);
  });
});
