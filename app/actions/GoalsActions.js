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
        var list = snapshot.data().goals;
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
  var categories;
  var goals;
  var goalsCompleted;
  var goalsSet;

  return (dispatch) => {
    dbRef
      .once('value', (snap) => {
        lastActive = snap.val().lastActive;
        goalsList = snap.val().goalsList;
        categories = snap.val().categories;
        goals = snap.val().goals;
        goalsCompleted = snap.val().goalsCompleted;
        goalsSet = snap.val().goalsSet;
      })
      .then(() => {
        lastActive == currentDate && goalsList
          ? returnCurrentGoals(dispatch, goalsList)
          : fetchNewGoals(dispatch, dbRef, goals, categories);
      })
      .then(() => {
        if (goalsList && lastActive !== currentDate) {
          let completed = goalsList.filter((goal) => goal.completed == true)
            .length;
          let newCompleted = parseInt(goalsCompleted) + parseInt(completed);
          let newGoalsSet = parseInt(goalsSet) + parseInt(goals);

          dbRef.update({
            goalsCompleted: newCompleted,
            goalsSet: newGoalsSet,
            lastActive: currentDate,
          });
        }
      });
  };
};

const returnCurrentGoals = (dispatch, goals) => {
  dispatch({
    type: GOALS_FETCH,
    payload: goals,
  });
};

const fetchNewGoals = (dispatch, dbRef, goals, categories) => {
  categories = categories.map((item) => item.toLowerCase());
  goals = parseInt(goals);

  firebase
    .firestore()
    .collection('goalsDB')
    .doc('goals')
    .onSnapshot((snapshot) => {
      var list = snapshot.data().goals;
      var length = snapshot.data().length;
      var randomGoals = [];
      var randomIdxs = [];
      var randomIdx;

      for (var i = 0; i < goals; i++) {
        do randomIdx = generateRandomNumber(length);
        while (
          randomIdxs.includes(randomIdx) ||
          exerciseGoalExists(list[randomIdx], randomGoals) ||
          !categories.includes(list[randomIdx].category)
        );
        randomIdxs.push(randomIdx);
        var randomGoal = list[randomIdx];
        randomGoals.push(randomGoal);
      }

      randomGoals = randomGoals.map((goal) => ({...goal, completed: false}));

      dbRef.update({
        goalsList: randomGoals,
      });

      dispatch({
        type: GOALS_FETCH,
        payload: randomGoals,
      });
    });
};
