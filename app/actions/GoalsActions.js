import * as firebase from 'firebase';
import 'firebase/firestore';
import {GOALS_FETCH} from './types';
import {getDate} from './AuthActions';
import {
  updateGoalsForNewCategories,
  generateRandomNumber,
  exerciseGoalExists,
} from './Utils';

export const changeGoalsAfterCategoryUpdate = (currentGoals, newCategories) => {
  newCategories = newCategories.map((item) => item.toLowerCase());
  const {currentUser} = firebase.auth();
  const dbRef = firebase.database().ref(`/users/${currentUser.uid}/profile`);

  return (dispatch) => {
    firebase
      .firestore()
      .collection('goalsDB')
      .doc('goals')
      .onSnapshot((snapshot) => {
        list = snapshot.data().goals;
        var newGoals = updateGoalsForNewCategories(
          newCategories,
          currentGoals,
          list,
        );

        dbRef.update({
          goalsList: newGoals,
        });

        dispatch({
          type: GOALS_FETCH,
          payload: newGoals,
        });
      });
  };
};

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
        categories = snap.val().categories;
      })
      .then(() => {
        lastActive == currentDate && goalsList
          ? returnCurrentGoals(dispatch, goalsList)
          : fetchNewGoals(dispatch, dbRef, currentDate, categories);
      });
  };
};

const returnCurrentGoals = (dispatch, goals) => {
  dispatch({
    type: GOALS_FETCH,
    payload: goals,
  });
};

const fetchNewGoals = (dispatch, dbRef, currentDate, categories) => {
  console.log('Fetching new goals...');
  categories = categories.map((item) => item.toLowerCase());
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
        while (
          randomIdxs.includes(randomIdx) ||
          exerciseGoalExists(list[randomIdx], randomGoals) ||
          !categories.includes(list[randomIdx].category)
        );
        randomIdxs.push(randomIdx);
        randomGoal = list[randomIdx];
        randomGoals.push(randomGoal);
      }

      dbRef.update({
        goalsList: randomGoals,
        lastActive: currentDate,
      });

      console.log('Dispatching new goals...');
      dispatch({
        type: GOALS_FETCH,
        payload: randomGoals,
      });
    });
};
