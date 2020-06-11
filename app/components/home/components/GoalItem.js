import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {PRIMARY_COLOUR, SECONDARY_COLOUR} from '../../design';

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
    if (showDescription[idx]) {
      toggleDescription(idx);
    }
    goals[idx].completed = !goals[idx].completed;
    updateGoals(goals);
  };

  return (
    <View>
      <View style={styles.listContainer}>
        <View style={{width: '100%'}}>
          <TouchableOpacity onPress={() => toggleDescription(index)}>
            <View
              style={[
                {
                  backgroundColor: goal.completed
                    ? PRIMARY_COLOUR
                    : SECONDARY_COLOUR,
                },
                styles.goal,
              ]}>
              <Text style={styles.goalText}>{goal.title}</Text>
              <TouchableOpacity onPress={() => this.toggleGoalCompleted(index)}>
                <Icon
                  name={
                    goal.completed
                      ? 'ios-checkmark-circle'
                      : 'ios-checkmark-circle-outline'
                  }
                  size={40}
                  style={{marginRight: 10}}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
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
    marginTop: 30,
  },
  goal: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 15,
    height: 50,
  },
  goalText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 15,
  },
  description: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: SECONDARY_COLOUR,
    height: 55,
    marginTop: 5,
  },
  descriptionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    width: '95%',
  },
});
