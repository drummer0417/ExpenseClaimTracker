import * as redux from 'redux';
import thunk from 'redux-thunk';

import {searchTextReducer, showCompletedReducer, claimsReducer, authReducer} from 'reducers';


export var configure = (initialState = {}) => {
  var reducer = redux.combineReducers({
    auth: authReducer,
    searchText: searchTextReducer,
    showCompleted: showCompletedReducer,
    claims: claimsReducer
  });

  // create store... if browser supports devTools then pass in the devTools otherwise
  // just pass in the function.
  var store = redux.createStore(reducer, initialState, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension? window.devToolsExtension(): f => f
  ));

  return store;
};
