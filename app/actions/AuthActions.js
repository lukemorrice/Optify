import firebase from 'firebase';

import {
  AUTH_LOGIN_USER,
  AUTH_LOGIN_USER_FAIL,
  AUTH_LOGIN_USER_SUCCESS,
  AUTH_CREATE_USER,
  AUTH_CREATE_USER_FAIL,
  AUTH_CREATE_USER_SUCCESS,
  AUTH_LOGOUT_USER,
} from '../actions/types';

export const createUser = (firstName, lastName, email, password) => {
  return (dispatch) => {
    dispatch({type: AUTH_CREATE_USER});

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => createUserSuccess(dispatch, user))
      .then(() => {
        const {currentUser} = firebase.auth();
        const date = getDate();
        try {
          firebase
            .database()
            .ref(`/users/${currentUser.uid}/`)
            .set({
              profile: {
                firstName,
                lastName,
                email,
                password,
                goals: 1,
                lastActive: date,
                goalsList: {},
              },
            });
        } catch (error) {
          console.log(error);
        }
      })
      .catch((error) => createUserFail(dispatch, error.message));
  };
};

export const getDate = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const fullDate = day + '/' + month + '/' + year;
  return fullDate;
};

const createUserFail = (dispatch, error) => {
  dispatch({type: AUTH_CREATE_USER_FAIL, payload: error});
};

const createUserSuccess = (dispatch, user) => {
  console.log('User created');
  dispatch({
    type: AUTH_CREATE_USER_SUCCESS,
    payload: user,
  });
};

export const loginUser = (email, password) => {
  console.log('User logging in:', email);
  return (dispatch) => {
    dispatch({type: AUTH_LOGIN_USER});

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => loginUserSuccess(dispatch, user))
      .catch((error) => loginUserFail(dispatch, error.message));
  };
};

const loginUserFail = (dispatch, error) => {
  dispatch({type: AUTH_LOGIN_USER_FAIL, payload: error});
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: AUTH_LOGIN_USER_SUCCESS,
    payload: user,
  });
};

export const logoutUser = (dispatch) => {
  return (dispatch) => {
    dispatch({type: AUTH_LOGOUT_USER});
    firebase.auth().signOut();
  };
};
