import {GOALS_FETCH} from './types';

export const updateGoalsForNewCategories = (
  categoryList,
  currentGoalsList,
  fullGoalsList,
) => {
  console.log('Changing goals after category update...');
  var newGoalsList = currentGoalsList.filter((goal) =>
    categoryList.includes(goal.category),
  );

  // return just one goal if exercise is the user's only goal type is exercise
  if (categoryList.includes('exercise') && categoryList.length == 1) {
    return onlyExerciseGoals(currentGoalsList, fullGoalsList);
  }

  if (newGoalsList.length !== 3) {
    const availableGoals = fullGoalsList.filter((goal) =>
      categoryList.includes(goal.category),
    );

    if (availableGoals.length < currentGoalsList.length) {
      return availableGoals;
    }

    var numOfNeededGoals = currentGoalsList.length - newGoalsList.length;
    console.log('Need to generate', numOfNeededGoals, 'more goals');
    var newGoal;

    const goalTitles = newGoalsList.map((goal) => goal.title);

    if (numOfNeededGoals > 0) {
      for (let i = 0; i < numOfNeededGoals; i++) {
        do {
          newGoal = availableGoals[generateRandomNumber(availableGoals.length)];
          console.log(goalTitles.includes(newGoal.title));
        } while (
          goalTitles.includes(newGoal.title) ||
          exerciseGoalExists(newGoal, newGoalsList)
        );
        newGoalsList.push(newGoal);
        console.log('Adding', newGoal.title, 'to goals list');
      }
    }
    return newGoalsList;
  } else {
    return newGoalsList;
  }
};

const onlyExerciseGoals = (userGoals, allGoals) => {
  let newGoals = [];
  let exerciseGoals = userGoals.filter((goal) => goal.category == 'exercise');
  if (exerciseGoals.length >= 1) {
    newGoals.push(exerciseGoals[0]);
  } else {
    let allExerciseGoals = allGoals.filter(
      (goal) => goal.category == 'exercise',
    );
    let randomIdx = generateRandomNumber(allExerciseGoals.length);
    let newGoal = allExerciseGoals[randomIdx];
    console.log('Added:', newGoal.title);
    newGoals.push(newGoal);
  }

  return newGoals;
};

export const generateRandomNumber = (maximum) => {
  return Math.floor(Math.random() * maximum);
};

export const exerciseGoalExists = (goal, currentGoalsList) => {
  if (goal.category == 'exercise' && currentGoalsList.length > 0) {
    const goalsCategories = currentGoalsList.map((goal) => goal.category);
    if (goalsCategories.includes('exercise')) {
      return true;
    }
  } else {
    return false;
  }
};

export const walkingGoalExists = (goal, currentGoals) => {
  let walk = 'Go for a walk';
  let morningWalk = 'Go for a morning walk';
  if (goal.title == walk || goal.title == morningWalk) {
    const currentGoalsTitles = currentGoals.map((goal) => goal.title);
    if (goal.title == walk && currentGoalsTitles.includes(morningWalk)) {
      return true;
    } else if (goal.title == morningWalk && currentGoalsTitles.includes(walk)) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const replaceGoal = (goalToReplace, fullGoalsList, dispatch, dbRef) => {
  dbRef.once('value', (snap) => {
    var currentGoalsList = snap.val().goalsList;
    var currentGoalsTitles = currentGoalsList.map((item) => item.title);
    var categories = snap.val().categories.map((item) => item.toLowerCase());
    var deletedGoals = snap.val().deletedGoalsList;
    if (!deletedGoals) {
      deletedGoals = [];
    }
    fullGoalsList = fullGoalsList.filter((goal) =>
      categories.includes(goal.category),
    );

    var newGoal;
    var count = 0;
    do {
      if (count > fullGoalsList.length * 3) {
        break;
      }
      newGoal = fullGoalsList[generateRandomNumber(fullGoalsList.length)];
    } while (
      currentGoalsTitles.includes(newGoal.title) ||
      deletedGoals.includes(newGoal)
    );

    var newGoalsList = currentGoalsList.filter(
      (goal) => goal.title !== goalToReplace.title,
    );
    newGoalsList = newGoalsList.concat([newGoal]);

    dispatch({type: GOALS_FETCH, payload: newGoalsList});
    dbRef.update({goalsList: newGoalsList});
  });
};
