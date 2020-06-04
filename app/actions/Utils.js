export const updateGoalsForNewCategories = (
  categoryList,
  currentGoalsList,
  fullGoalsList,
) => {
  var newGoalsList = currentGoalsList.filter((goal) =>
    categoryList.includes(goal.category),
  );

  if (newGoalsList.length !== 3) {
    const availableGoals = fullGoalsList.filter((goal) =>
      categoryList.includes(goal.category),
    );

    var numOfNeededGoals = 3 - newGoalsList.length;

    for (i = 0; i < numOfNeededGoals; i++) {
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
