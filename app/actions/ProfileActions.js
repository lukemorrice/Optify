import {PROFILE_FETCH, PROFILE_UPDATE_GOALS} from './types';
import firebase from 'firebase';

export const fetchProfile = () => {
  const {currentUser} = firebase.auth();

  return (dispatch) => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/profile`)
      .on('value', (snapshot) => {
        dispatch({
          type: PROFILE_FETCH,
          payload: snapshot.val(),
        });
      });
  };
};

export const updateGoals = (goals) => {
  const {currentUser} = firebase.auth();

  return (dispatch) => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/profile`)
      .update({goals})
      .then(() => {
        dispatch({
          type: PROFILE_UPDATE_GOALS,
        });
      });
  };
};
