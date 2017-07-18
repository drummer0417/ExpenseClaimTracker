var moment = require('moment');
var uuid = require('node-uuid');


export var authReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        uid: action.uid
      };

    case 'LOGOUT':
      return {};

    default:
      return state;
  };
}

export var searchTextReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_SEARCH_TEXT':
      return action.searchText;
    default:
      return state;
  };
}

export var showCompletedReducer = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_SHOW_COMPLETED':
      return !state;
    default:
      return state;
  };
}

export var claimsReducer = (state = [], action) => {
  switch (action.type){

    case 'INITIALIZE_CLAIMS':
      return action.initialClaims;

    case 'ADD_CLAIM':
      return [...state,
        action.claim
      ];

    case 'UPDATE_CLAIM':
      var updatedClaims = state.map((claim) => {
        if (claim.id === action.id) {
          console.log('in reducer, claim gevonden: ', claim);
          console.log('in reducer, claim updates: ', action.updates);
          return {
            ...claim,
            ...action.updates
            }
          } else {
            return claim;
        }
      });
      return updatedClaims;

    case 'LOGOUT':
        return [];

    default:
      return state;
  };
};
