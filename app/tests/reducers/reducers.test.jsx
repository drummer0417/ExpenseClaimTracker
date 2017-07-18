//
// deep-freeze-strict is used to test that the parms of the reducers are not
// modified. This is not permitted as reducers should be pure functions

var df = require('deep-freeze-strict');
var expect = require('expect');
var moment = require('moment');

var reducers = require('reducers');

describe('Reducers', () => {

  describe('searchTextReducer', () => {
    it('Should return the searchText', () => {
      var state = '';
      var action = {
        type: "SET_SEARCH_TEXT",
        searchText: "the searchText"
      }
      expect(reducers.searchTextReducer(df(state), df(action))).toBe('the searchText');
    });

    it('Should return the default searchText if unknow type, which is ""', () => {
      var state = '';
      var action = {
        type: "unknown",
        searchText: "the searchText"
      }
      expect(reducers.searchTextReducer(df(state), df(action))).toBe('');
    });
  });

  describe('showCompletedReducer', () => {

    it('Should return the toggled showCompleted value, true in this case', () => {
      var state = false;
      var action = {
        type: 'TOGGLE_SHOW_COMPLETED'
      };
      expect(reducers.showCompletedReducer(df(state), df(action))).toBe(true);
    });

    it('Should return the toggled showCompleted value, false in this case', () => {
      var state = true;
      var action = {
        type: 'TOGGLE_SHOW_COMPLETED'
      };
      expect(reducers.showCompletedReducer(df(state), df(action))).toBe(false);
    });

    it('Should return the toggled showCompleted value, true in this case', () => {
      var state = false;
      var action = {
        type: 'TOGGLE_SHOW_COMPLETED'
      };
      expect(reducers.showCompletedReducer(df(state), df(action))).toBe(true);
    });

    it('Should return the default state if unknow type, which is false', () => {
      var state = false;
      var action = {
        type: "unknown",
        toggleShowCompleted: false
      }
      expect(reducers.showCompletedReducer(df(state), df(action))).toBe(false);
    });
  });

  describe('claimsReducer', () => {

    it('Should return array with new claim', () => {
      var state = [];
      var claim = {
        id: '123',
        text: 'implement claimsReducer test case',
        completed: false,
        completedAt: undefined
      };
      var action = {
        type: 'ADD_TODO',
        claim
      }

      expect(reducers.claimsReducer(df(state), df(action)).length).toBe(1);
      expect(reducers.claimsReducer(df(state), df(action))[0]).toContain(claim);
    });

    it('Should toggle state to completed and fill date completed', () => {
      var state = [
        {id: 100, text: 'first claim', createdAt: moment().unix(), completed: false, completedAt: undefined},
        {id: 123, text: 'implement claimsReducer test case', createdAt: moment().unix(), completed: false, completedAt: undefined},
        {id: 200, text: 'last claim', createdAt: moment().unix(), completed: false, completedAt: undefined}
      ];
      var action = {
        type: 'UPDATE_TODO',
        id: 123,
        updates: {completed: true, completedAt: 435454345},
      };

      var newClaims = reducers.claimsReducer(df(state), df(action));
      expect(newClaims[1].completed).toBe(true);
      expect(newClaims.length).toBe(3);;
      var seconds = parseInt(newClaims[1].completedAt);
      expect(seconds).toBe(435454345);
    });

    it('Should toggle state completed to false and clear date completed', () => {
      var state = [
        {id: 100, text: 'first claim', createdAt: moment().unix(), completed: false, completedAt: undefined},
        {id: 123, text: 'implement claimsReducer test case', createdAt: moment().unix(), completed: true, completedAt: 123232131},
        {id: 200, text: 'last claim', createdAt: moment().unix(), completed: false, completedAt: undefined}
      ];
      var action = {
        type: 'UPDATE_TODO',
        id: 123,
        updates: {completed: false, completedAt: undefined},
      };
      var newClaims = reducers.claimsReducer(df(state), df(action));

      expect(newClaims.length).toBe(3);
      expect(newClaims[1].completed).toBe(false);
      expect(newClaims[1].completedAt).toBe(undefined);
    });

    it('Should add initial claims', () => {
      var initialClaims = [
        {id: 1, text: 'claim 1', completed: false, createdAt: 23423434},
        {id: 2, text: 'claim 2', completed: true, createdAt: 23423444},
        {id: 3, text: 'claim 3', completed: false, createdAt: 23423554}
      ];
      var action = {
        type: 'INITIALIZE_TODOS',
        initialClaims: initialClaims
      };
      var res = reducers.claimsReducer(df([]), df(action));

      expect(res.length).toBe(initialClaims.length);
      expect(res[1]).toEqual(initialClaims[1]);
    })

    it('Should cleanup claims on logout', () => {
      var initialClaims = [
        {id: 1, text: 'claim 1', completed: false, createdAt: 23423434},
        {id: 2, text: 'claim 2', completed: true, createdAt: 23423444},
        {id: 3, text: 'claim 3', completed: false, createdAt: 23423554}
      ];
      var cleanedUpClaims = [];
      var action = {
        type: 'LOGOUT'
      };
      var res = reducers.claimsReducer(df(initialClaims), df(action));

      expect(res.length).toBe(0);
    })

  });

  describe('authReducer', () => {

      it('should store uid on login', () => {
        var action = {
          type: 'LOGIN',
          uid: '123abc'
        }
        var res = reducers.authReducer(undefined, df(action));
        expect(res).toEqual({
          uid: action.uid
        });
      });
      it('should remove uid on logout', () => {
        var action = {
          type: 'LOGOOUT'
        }
        var res = reducers.authReducer(undefined, df(action));
        expect(res).toEqual({});
      });
  });
});
