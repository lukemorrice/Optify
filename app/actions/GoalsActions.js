import {GOALS_FETCH} from './types';
import {getDate} from './AuthActions';
import * as firebase from 'firebase';
import 'firebase/firestore';

export const changeGoalsAfterCategoryUpdate = (currentGoals, newCategories) => {
  var newGoals = [];
  newCategories = newCategories.map((item) => item.toLowerCase());
  const {currentUser} = firebase.auth();
  const dbRef = firebase.database().ref(`/users/${currentUser.uid}/profile`);

  return (dispatch) => {
    firebase
      .firestore()
      .collection('goalsDB')
      .doc('goals')
      .onSnapshot((snapshot) => {
        length = snapshot.data().length;
        list = snapshot.data().goals;

        for (i = 0; i < 3; i++) {
          var currentGoal = currentGoals[i];
          if (newCategories.includes(currentGoal.category)) {
            // this goal is still valid as its category is in the user's set of categories
            console.log('Keeping', currentGoal.title, 'in set of goals');
            newGoals.push(currentGoal);
          } else {
            console.log(
              currentGoal.category,
              'not in',
              newCategories,
              '...generating new goal...',
            );
            // need to generate a new goal which is of a valid category
            do {
              newGoal = list[generateRandomNumber(length)];
            } while (
              newGoals.includes(newGoal) ||
              !newCategories.includes(newGoal.category) ||
              exerciseGoalExists(newGoal, newGoals)
            );
            console.log('Adding:', newGoal.title, '...to new set of goals');
            newGoals.push(newGoal);
          }
        }

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
      })
      .then(() => {
        lastActive == currentDate && goalsList
          ? returnCurrentGoals(dispatch, goalsList)
          : fetchNewGoals(dispatch, dbRef, currentDate);
      });
  };
};

const returnCurrentGoals = (dispatch, goals) => {
  dispatch({
    type: GOALS_FETCH,
    payload: goals,
  });
};

const fetchNewGoals = (dispatch, dbRef, currentDate) => {
  firebase
    .firestore()
    .collection('goalsDB')
    .doc('goals')
    .onSnapshot((snapshot) => {
      list = snapshot.data().goals;
      length = snapshot.data().length;
      categories = snapshot.data().categories;
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

      dispatch({
        type: GOALS_FETCH,
        payload: randomGoals,
      });
    });
};

const generateRandomNumber = (maximum) => {
  return Math.floor(Math.random() * maximum);
};

const exerciseGoalExists = (goal, currentGoalsList) => {
  if (goal.category == 'exercise' && currentGoalsList.length > 0) {
    const goalsCategories = currentGoalsList.map((goal) => goal.category);
    if (goalsCategories.includes('exercise')) {
      return true;
    }
  } else {
    return false;
  }
};
