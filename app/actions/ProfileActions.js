import {
  PROFILE_FETCH,
  PROFILE_UPDATE_GOALS,
  PROFILE_UPDATE_CATEGORIES,
} from './types';
import firebase from 'firebase';

export const updateGoalsCategories = (categories) => {
  const {currentUser} = firebase.auth();

  return (dispatch) => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/profile`)
      .update({categories})
      .then(() => {
        dispatch({
          type: PROFILE_UPDATE_CATEGORIES,
        });
      });
  };
};

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
