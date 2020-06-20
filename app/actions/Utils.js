export const updateGoalsForNewCategories = (
  categoryList,
  currentGoalsList,
  fullGoalsList,
) => {
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

    var numOfNeededGoals = currentGoalsList.length - newGoalsList.length;
    var newGoal;

    if (numOfNeededGoals > 1) {
      for (let i = 0; i < numOfNeededGoals; i++) {
        do {
          newGoal = availableGoals[generateRandomNumber(availableGoals.length)];
        } while (
          newGoalsList.includes(newGoal) ||
          exerciseGoalExists(newGoal, newGoalsList)
        );
        newGoalsList.push(newGoal);
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
