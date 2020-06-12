import * as firebase from 'firebase';
import 'firebase/firestore';
import {GOALS_FETCH, CUSTOM_GOALS_FETCH} from './types';
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

export const addCustomGoal = (title, description, dailyGoal) => {
  const {currentUser} = firebase.auth();
  const dbRef = firebase.database().ref(`/users/${currentUser.uid}/profile`);
  var newGoal = {title, description, dailyGoal};
  var newGoals = [];
  var customGoalsList = [];
  var dailyGoalsList = [];

  if (dailyGoal) {
    return (dispatch) => {
      dbRef
        .once('value', (snap) => {
          dailyGoalsList = snap.val().dailyGoalsList;
        })
        .then(() => {
          if (dailyGoalsList) {
            newGoals = newGoals.concat(dailyGoalsList);
          }
          newGoals = newGoals.concat([newGoal]);
          dbRef.update({
            dailyGoalsList: newGoals,
          });

          dispatch({
            type: CUSTOM_GOALS_FETCH,
            payload: newGoals,
          });
        });
    };
  } else {
    return (dispatch) => {
      dbRef
        .once('value', (snap) => {
          customGoalsList = snap.val().customGoalsList;
        })
        .then(() => {
          if (customGoalsList) {
            newGoals = newGoals.concat(customGoalsList);
          }
          newGoals = newGoals.concat([newGoal]);
          dbRef.update({
            customGoalsList: newGoals,
          });

          dispatch({
            type: CUSTOM_GOALS_FETCH,
            payload: newGoals,
          });
        });
    };
  }
};

export const removeCustomGoal = (goalTitle) => {
  const {currentUser} = firebase.auth();
  const dbRef = firebase.database().ref(`/users/${currentUser.uid}/profile`);
  var currentCustomGoals;
  var newCustomGoals;

  dbRef.once('value', (snap) => {
    currentCustomGoals = snap.val().customGoalsList;
    newCustomGoals = currentCustomGoals.filter(
      (goal) => goal.title !== goalTitle,
    );

    dbRef.update({
      customGoalsList: newCustomGoals,
    });
  });
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
  var customGoalsList;

  return (dispatch) => {
    dbRef
      .once('value', (snap) => {
        lastActive = snap.val().lastActive;
        goalsList = snap.val().goalsList;
        categories = snap.val().categories;
        goals = snap.val().goals;
        goalsCompleted = snap.val().goalsCompleted;
        goalsSet = snap.val().goalsSet;
        customGoalsList = snap.val().customGoalsList;
      })
      .then(() => {
        lastActive == currentDate && goalsList
          ? returnCurrentGoals(dispatch, goalsList)
          : fetchNewGoals(dispatch, dbRef, goals, categories, customGoalsList);
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

const fetchNewGoals = (dispatch, dbRef, goals, categories, customGoalsList) => {
  categories = categories.map((item) => item.toLowerCase());
  goals = parseInt(goals);

  firebase
    .firestore()
    .collection('goalsDB')
    .doc('goals')
    .onSnapshot((snapshot) => {
      var list = snapshot.data().goals;
      if (customGoalsList) {
        list = list.concat(customGoalsList);
      }
      var length = list.length;
      var randomGoals = [];
      var randomGoal;

      for (var i = 0; i < goals; i++) {
        do randomGoal = list[generateRandomNumber(length)];
        while (
          randomGoals.includes(randomGoal) ||
          exerciseGoalExists(randomGoal, randomGoals) ||
          !categories.includes(randomGoal.category)
        );
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
