import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

export default Goal = ({goals, goal, index, updateGoals}) => {
  toggleGoalCompleted = (idx) => {
    goals[idx].completed = !goals[idx].completed;
    updateGoals(goals);
  };

  return (
    <View style={styles.listContainer}>
      <View
        style={[
          {backgroundColor: goal.completed ? '#1ABC9C' : '#64B5F6'},
          styles.goal,
        ]}>
        <Text style={styles.goalText}>{goal.title}</Text>
      </View>
      <TouchableOpacity onPress={() => this.toggleGoalCompleted(index)}>
        <Icon
          name={
            goal.completed
              ? 'ios-checkmark-circle'
              : 'ios-checkmark-circle-outline'
          }
          size={40}
          style={{marginRight: 10}}
          color={goal.completed ? '#1ABC9C' : '#FF1744'}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  goal: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    width: 275,
    height: 52,
  },
  goalText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
