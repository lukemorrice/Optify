import {GOALS_FETCH} from './types';
import {getDate} from './AuthActions';
import * as firebase from 'firebase';
import 'firebase/firestore';

export const fetchGoals = () => {
  const {currentUser} = firebase.auth();
  const dbRef = firebase.database().ref(`/users/${currentUser.uid}/profile`);
  const currentDate = getDate();
  var lastActive;
  var goalsList;

  return (dispatch) => {
    dbRef
      .once('value', (snap) => {
        lastActive = snap.val().lastActive;
        goalsList = snap.val().goalsList;
      })
      .then(() => {
        lastActive == currentDate && goalsList
          ? returnCurrentGoals(dispatch, goalsList)
          : fetchNewGoals(dispatch, dbRef, currentDate);
      });
  };
};

const returnCurrentGoals = (dispatch, goals) => {
  console.log('Returning current goals...');
  dispatch({
    type: GOALS_FETCH,
    payload: goals,
  });
};

const fetchNewGoals = (dispatch, dbRef, currentDate) => {
  console.log('Fetching new goals...');
  firebase
    .firestore()
    .collection('goalsDB')
    .doc('goals')
    .onSnapshot((snapshot) => {
      list = snapshot.data().goals;
      length = snapshot.data().length;
      randomGoals = [];
      randomIdxs = [];

      for (var i = 0; i < 3; i++) {
        do randomIdx = generateRandomNumber(length);
        while (randomIdxs.includes(randomIdx));
        randomIdxs.push(randomIdx);
        randomGoal = list[randomIdx];
        randomGoals.push(randomGoal);
        console.log(randomGoal);
      }

      dbRef.update({
        goalsList: randomGoals,
        lastActive: currentDate,
      });

      dispatch({
        type: GOALS_FETCH,
        payload: randomGoals,
      });
    });
};

const generateRandomNumber = (maximum) => {
  return Math.floor(Math.random() * maximum);
};
