import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import expect from 'expect';

import firebase, {firebaseRef} from 'initFirebase';
import * as actions from 'actions';

var createMockStore = configureMockStore([thunk]);

describe('Actions', () => {

  it('Should generate searchText action', () => {
    var action =  {
      type: 'SET_SEARCH_TEXT',
      searchText: 'Some searchText'
    }
    expect(actions.setSearchText('Some searchText')).toEqual(action);
  });

  it('Should generate add initial claims action object', () => {
    var initialClaims = [
      {id: 1, text: 'claim 1', completed: false, createdAt: 23423434},
      {id: 2, text: 'claim 2', completed: true, createdAt: 23423444},
      {id: 3, text: 'claim 3', completed: false, createdAt: 23423554}
    ];
    var action = {
      type: 'INITIALIZE_CLAIMS',
      initialClaims: initialClaims
    };
    var res = actions.initializeClaims(initialClaims);
    expect(res).toEqual(action);
  })

  it('Should generate addClaim action', () => {
    var claim: {
      text: 'A new claim',
      completd: false,
      createdAt: 123,
      completedAt: undefined
    }
    var action =  {
      type: 'ADD_CLAIM',
      claim
    }
    expect(actions.addClaim(claim)).toEqual(action);
  });

  it('Should generate toggelShowCompleted action', () => {
    var action =  {
      type: 'TOGGLE_SHOW_COMPLETED'
    }

    expect(actions.toggleShowCompleted()).toEqual(action);
  });

  it('Should generate updateClaim action', () => {
    var id = '321';
    var updates = {
      completed: false,
      completedAt: 123123
    };
    var res =  {
      type: 'UPDATE_CLAIM',
      id: '321',
      updates: {
        completed: false,
        completedAt: 123123
      }
    }
    expect(actions.updateClaim(id, updates)).toContain(res);
  });

  it('Should generate login action object', () => {
    var action = {
      type: 'LOGIN',
      uid: 123
    }
    expect(actions.login(123)).toEqual(action);
  });

  it('Should generate logout action', () => {
    var action = {
      type: 'LOGOUT'
    };
    expect(actions.logout()).toEqual(action)
  });

  describe('Tests with firebase claims', () => {

    var testClaimRef;
    var uid;
    var claimsRef;

    beforeEach ((done) => {
      firebase.auth().signInAnonymously().then((user) => {
        uid = user.uid;
        claimsRef = firebaseRef.child(`users/${uid}/claims`);
        return claimsRef.remove();
      }).then(() => {
        testClaimRef = claimsRef.push();
        return testClaimRef.set({
          text: 'testClaim',
          completed: false,
          createdAt: 123123123
        });
      }).then(() => {
        done();
      }).catch(done);
    });

    afterEach((done) => {
      claimsRef.remove().then(() => done());
    });

    it('Should toggle claim and dispatch UPDATE_CLAIM action ', (done) => {
      const store = createMockStore({auth: {uid: uid}});
      const action = actions.startToggleClaim(testClaimRef.key, true);

      store.dispatch(action).then(() => {
        var mockActions = store.getActions();

        expect(mockActions[0]).toInclude({
          type: 'UPDATE_CLAIM',
          id: testClaimRef.key
        });
        expect(mockActions[0].updates).toInclude({
          completed: true
        })
        expect(mockActions[0].updates.completedAt).toBeGreaterThan(0);
        done();
      }, done).catch(done);;
    });

    it('Should return all claims (1) in an array', (done) => {

      const store = createMockStore({auth: {uid: uid}});
      const action = actions.startInitializeClaims();
      store.dispatch(action).then(() => {
        var mockActions = store.getActions();

        expect(mockActions[0].initialClaims.length).toBe(1);
        expect(mockActions[0].type).toBe('INITIALIZE_CLAIMS');
        expect(mockActions[0].initialClaims[0]).toInclude(
            {id: testClaimRef.key, text: 'testClaim'}
          );
        done();
      }, done).catch(done);
    });

    it('Should create claim and dispatch ADD_CLAIM', (done) => {

      const store = createMockStore({auth: {uid: uid}});
      const claimText = 'Perform Async test';
      var id;
      store.dispatch(actions.startAddClaim(claimText)).then(() => {

        const actions = store.getActions();
        id = actions[0].claim.id;
        expect(actions[0]).toInclude({type: 'ADD_CLAIM'});
        expect(actions[0].claim).toInclude({text: claimText});
        firebaseRef.child('claims/' + id).remove();
        done();
      }).catch(done);
    });
  });
});
