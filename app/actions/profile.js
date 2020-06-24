import {
  PROFILE_FETCH,
  PROFILE_UPDATE_GOALS,
  PROFILE_UPDATE_CATEGORIES,
  GOALS_FETCH,
} from './types';
import {changeGoalsAfterCategoryUpdate} from './goals';
import {generateRandomNumber, exerciseGoalExists} from './utils';
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

export const updateCategories = (dispatch, categories) => {
  const {currentUser} = firebase.auth();
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

export const updateGoals = (dispatch, goals) => {
  const {currentUser} = firebase.auth();
  const dbRef = firebase.database().ref(`/users/${currentUser.uid}/profile`);
  var currentGoals;
  var dailyGoals;
  var currentNumGoals;
  var categories;
  var fullGoalsList;

  dbRef.once('value', (snap) => {
    currentGoals = snap.val().goalsList;
    dailyGoals = currentGoals.filter((goal) => goal.dailyGoal);
    currentGoals = currentGoals.filter((goal) => !goal.dailyGoal);
    currentNumGoals = snap.val().goals;
    categories = snap.val().categories;
  });

  var goalsNeeded = parseInt(goals) - parseInt(currentNumGoals);

  firebase
    .firestore()
    .collection('goalsDB')
    .doc('goals')
    .onSnapshot((snapshot) => {
      fullGoalsList = snapshot.data().goals;
      var newGoalsSet = [];

      // need to add more goals
      if (goalsNeeded >= 1) {
        var addedGoals = getMoreGoals(
          goalsNeeded,
          currentGoals,
          categories,
          fullGoalsList,
        );
        newGoalsSet = currentGoals.concat(addedGoals);
      }
      // number of goals hasn't changed
      else if (goalsNeeded == 0) {
        console.log('Nothing to see here.');
        newGoalsSet = currentGoals;
      }
      // need to remove goals
      // return as many goals as needed from list in reverse order
      else {
        currentGoals = sortByCompleted(currentGoals);
        for (var i = 0; i < goals; i++) {
          newGoalsSet.push(currentGoals[i]);
        }
      }

      var goalsList = dailyGoals.concat(newGoalsSet);
      dbRef
        .update({
          goals,
          goalsList,
        })
        .then(() => {
          dispatch({
            type: PROFILE_UPDATE_GOALS,
          });
          dispatch({type: GOALS_FETCH, payload: goalsList});
        });
    });
};

const getMoreGoals = (goalsNeeded, currentGoals, categories, fullGoalsList) => {
  var newGoals = [];
  categories = categories.map((category) => category.toLowerCase());
  var goalsList = fullGoalsList.filter((goal) =>
    categories.includes(goal.category),
  );

  for (var i = 0; i < goalsNeeded; i++) {
    do {
      var newGoal = goalsList[generateRandomNumber(goalsList.length)];
    } while (
      newGoals.includes(newGoal) ||
      currentGoals.includes(newGoal) ||
      exerciseGoalExists(newGoal, newGoals.concat(currentGoals))
    );
    newGoal.completed = false;
    newGoals = newGoals.concat([newGoal]);
  }
  return newGoals;
};

sortByCompleted = (list) => {
  return list.sort((x, y) => y.completed - x.completed);
};

export const updateSettings = (numOfGoals, categories) => {
  console.log("Updating user's settings...");

  if (numOfGoals !== null) {
    return (dispatch) => {
      updateGoals(dispatch, numOfGoals);
    };
  }

  if (categories !== null) {
    return (dispatch) => {
      const {currentUser} = firebase.auth();
      const dbRef = firebase
        .database()
        .ref(`/users/${currentUser.uid}/profile`);
      dbRef.once('value', (snap) => {
        var currentGoals = snap.val().goalsList;
        updateCategories(dispatch, categories);
        const updateGoals = goalsNeedUpdating(currentGoals, categories);
        if (updateGoals) {
          changeGoalsAfterCategoryUpdate(dispatch, currentGoals, categories);
        }
      });
    };
  }
};

const goalsNeedUpdating = (goals, categories) => {
  categories = categories.map((item) => item.toLowerCase());
  for (var i = 0; i < goals.length; i++) {
    if (!categories.includes(goals[i].category)) {
      return true;
    }
  }
  return false;
};
