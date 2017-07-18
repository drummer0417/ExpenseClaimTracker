import firebase, {firebaseRef, githubProvider} from 'initFirebase';
import moment from 'moment';

import actions from 'actions';

export var startAddClaim = (claim) => {
  return (dispatch, getState) => {

    var uid = getState().auth.uid;
    var claimRef = firebaseRef.child(`users/${uid}/claims`).push(claim);
    return claimRef.then(() => {
      dispatch(addClaim({
          ...claim,
          id: claimRef.key
      })
    )});
  };
};

export var addClaim = (claim) => {
  return {
    type: 'ADD_CLAIM',
    claim
  };
};

export var startInitializeClaims = () => {
  return (dispatch, getState) => {
    var uid = getState().auth.uid;
    return firebaseRef.child(`users/${uid}/claims`).once('value').then((snapshot) => {
      var initialClaims = [];
      var claimKeysObject = snapshot.val() || {};
      var claimKeysArray = Object.keys(claimKeysObject);

      claimKeysArray.forEach((key) => {
        initialClaims = [...initialClaims, {id: key, ...claimKeysObject[key]}]
      })
      dispatch(initializeClaims(initialClaims));
    }, (error) => {
      console.log('error in startInitializeClaims: ', error);
    }).catch((error) => {
      console.log('in catch, error: ', error);
    });
  }
};

export var initializeClaims = (claims) => {
  return {
    type: 'INITIALIZE_CLAIMS',
    initialClaims: claims
  };
};

export var setSearchText = (searchText) => {
  return {
    type: 'SET_SEARCH_TEXT',
    searchText
  };
};

export var toggleShowCompleted = () => {
  return {
    type: 'TOGGLE_SHOW_COMPLETED'
  };
};

export var startToggleClaim = (id, completed) => {

  return (dispatch, getState) => {
    var uid = getState().auth.uid;
    var claimRef = firebaseRef.child(`users/${uid}/claims/${id}`);
    var status = completed? 'completed': 'not yet completd'
    var updates = {
      status,
      completedAt: completed? moment().unix(): null
    };
    return claimRef.update(updates).then(() => {
      dispatch(updateClaim(id, updates));
    });
  };
}

export var updateClaim = (id, updates)  => {
  return {
    type: 'UPDATE_CLAIM',
    id,
    updates
  };
};

export var startLogin = () => {
  return (dispatch, getState) => {
    return firebase.auth().signInWithPopup(githubProvider).then((result) => {
      // dispatch(login(result.user.uid));
    }, (error) => {
      console.log('Unable to authenticate: ', error);
    });
  };
}

export var startLogout = () => {
  return (dispatch, getState) =>  {
    return firebase.auth().signOut().then(() => {
      // dispatch(logout());
    });
  }
}

export var login = (uid) => {  return {
    type: 'LOGIN',
    uid
  }

}

export var logout = () => {
  return {
    type: 'LOGOUT'
  }
}