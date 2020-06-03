export const updateGoalsForNewCategories = (
  categoryList,
  currentGoalsList,
  fullGoalsList,
) => {
  var newGoalsList = [];
  const availableGoals = fullGoalsList.filter((goal) =>
    categoryList.includes(goal.category),
  );

  for (i = 0; i < 3; i++) {
    if (!availableGoals.includes(currentGoalsList[i])) {
      do {
        newGoal = availableGoals[generateRandomNumber(availableGoals.length)];
      } while (
        newGoalsList.includes(newGoal) ||
        exerciseGoalExists(newGoal, newGoalsList)
      );
    } else {
      newGoal = currentGoalsList[i];
    }
    newGoalsList.push(newGoal);
  }

  return newGoalsList;
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
