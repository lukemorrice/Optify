import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const options = {
  enableVibrateFallback: true,
};

export default Goal = ({
  goals,
  goal,
  index,
  updateGoals,
  toggleDescription,
  showDescription,
}) => {
  toggleGoalCompleted = (idx) => {
    ReactNativeHapticFeedback.trigger('impactMedium', options);
    goals[idx].completed = !goals[idx].completed;
    updateGoals(goals);
  };

  return (
    <View>
      <View style={styles.listContainer}>
        <TouchableOpacity onPress={() => toggleDescription(index)}>
          <View
            style={[
              {backgroundColor: goal.completed ? '#48C9B0' : '#64B5F6'},
              styles.goal,
            ]}>
            <Text style={styles.goalText}>{goal.title}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.toggleGoalCompleted(index)}>
          <Icon
            name={
              goal.completed
                ? 'ios-checkmark-circle'
                : 'ios-checkmark-circle-outline'
            }
            size={40}
            style={{marginRight: 10}}
            color={goal.completed ? '#48C9B0' : '#FF1744'}
          />
        </TouchableOpacity>
      </View>
      {showDescription[index] && (
        <View style={styles.description}>
          <Text style={styles.descriptionText}>{goal.description}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingVertical: 16,
    marginTop: 30,
    marginBottom: 10,
  },
  goal: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    width: 275,
    height: 50,
  },
  goalText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  description: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#48C9B0',
    width: '100%',
    height: 50,
  },
  descriptionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    width: '90%',
  },
});
