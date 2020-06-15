import * as firebase from 'firebase';
import 'firebase/firestore';
import {GOALS_FETCH, CUSTOM_GOALS_FETCH, PROFILE_FETCH} from './types';
import {getDate} from './authorisation';
import {
  updateGoalsForNewCategories,
  generateRandomNumber,
  exerciseGoalExists,
} from './utils';

export const changeGoalsAfterCategoryUpdate = (currentGoals, newCategories) => {
  newCategories = newCategories.map((item) => item.toLowerCase());
  const {currentUser} = firebase.auth();
  const dbRef = firebase.database().ref(`/users/${currentUser.uid}/profile`);
  var dailyGoals = currentGoals.filter((goal) => goal.dailyGoal);
  currentGoals = currentGoals.filter((goal) => !goal.dailyGoal);

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

        var goalsList = dailyGoals.concat(newGoals);
        dbRef.update({
          goalsList,
        });

        dispatch({
          type: GOALS_FETCH,
          payload: goalsList,
        });
      });
  };
};

export const addDailyGoal = (title, description, dailyGoal) => {
  const {currentUser} = firebase.auth();
  const dbRef = firebase.database().ref(`/users/${currentUser.uid}/profile`);
  var newGoal = {title, description, dailyGoal};
  var newGoals = [];
  var dailyGoalsList = [];

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
};

export const addCustomGoal = (title, description, dailyGoal) => {
  const {currentUser} = firebase.auth();
  const dbRef = firebase.database().ref(`/users/${currentUser.uid}/profile`);
  var newGoal = {title, description, dailyGoal};
  var newGoals = [];
  var customGoalsList = [];
  var profile;

  return (dispatch) => {
    dbRef
      .once('value', (snap) => {
        customGoalsList = snap.val().customGoalsList;
        profile = snap.val();
      })
      .then(() => {
        if (customGoalsList) {
          newGoals = newGoals.concat(customGoalsList);
        }
        newGoals = newGoals.concat([newGoal]);
        dbRef.update({
          customGoalsList: newGoals,
        });

        profile.customGoalsList = newGoals;

        dispatch({
          type: CUSTOM_GOALS_FETCH,
          payload: newGoals,
        });

        dispatch({
          type: PROFILE_FETCH,
          payload: profile,
        });
      });
  };
};

export const removeCustomGoal = (goal) => {
  const {currentUser} = firebase.auth();
  const dbRef = firebase.database().ref(`/users/${currentUser.uid}/profile`);
  var goalTitle = goal.title;

  if (goal.dailyGoal) {
    return (dispatch) => {
      dbRef.once('value', (snap) => {
        var profile = snap.val();
        var dailyGoalsList = snap.val().dailyGoalsList;
        dailyGoalsList = dailyGoalsList.filter(
          (goal) => goal.title !== goalTitle,
        );

        dbRef.update({
          dailyGoalsList,
        });

        var goalsList = snap.val().goalsList;
        goalsList = goalsList.filter((item) => item.title !== goal.title);

        profile.dailyGoalsList = dailyGoalsList;
        dispatch({
          type: PROFILE_FETCH,
          payload: profile,
        });
        dispatch({
          type: GOALS_FETCH,
          payload: goalsList,
        });
      });
    };
  } else {
    return (dispatch) => {
      dbRef.once('value', (snap) => {
        var profile = snap.val();
        var customGoalsList = snap.val().customGoalsList;
        customGoalsList = customGoalsList.filter(
          (goal) => goal.title !== goalTitle,
        );

        dbRef.update({
          customGoalsList,
        });

        var goalsList = snap.val().goalsList;
        goalsList = goalsList.filter((item) => item.title !== goal.title);

        profile.customGoalsList = customGoalsList;
        dispatch({
          type: PROFILE_FETCH,
          payload: profile,
        });
        dispatch({
          type: GOALS_FETCH,
          payload: goalsList,
        });
      });
    };
  }
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

export const updateUserGoals = (goalsList) => {
  const {currentUser} = firebase.auth();
  const dbRef = firebase.database().ref(`/users/${currentUser.uid}/profile`);
  return (dispatch) => {
    dbRef.update({goalsList});
  };
};

export const toggleGoalCompleted = (idx, goals) => {
  goals[idx].completed = !goals[idx].completed;
  var goalsList = goals;
  const {currentUser} = firebase.auth();
  const dbRef = firebase.database().ref(`/users/${currentUser.uid}/profile`);
  return (dispatch) => {
    dbRef.update({goalsList});

    dispatch({
      type: GOALS_FETCH,
      payload: goalsList,
    });
  };
};