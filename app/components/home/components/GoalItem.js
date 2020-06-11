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

  if (!showDescription[index]) {
    return (
      <View style={{marginTop: 30}}>
        <View style={styles.listContainer}>
          <View style={{width: '100%'}}>
            <TouchableOpacity onPress={() => toggleDescription(index)}>
              <View
                style={{
                  backgroundColor: goal.completed
                    ? PRIMARY_COLOUR
                    : SECONDARY_COLOUR,
                  borderRadius: 15,
                  height: 55,
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Text style={styles.goalText}>{goal.title}</Text>
                  <TouchableOpacity
                    onPress={() => this.toggleGoalCompleted(index)}>
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
                <View />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View style={{marginTop: 30}}>
        <View style={styles.listContainer}>
          <View style={{width: '100%'}}>
            <TouchableOpacity onPress={() => toggleDescription(index)}>
              <View
                style={{
                  backgroundColor: goal.completed
                    ? PRIMARY_COLOUR
                    : SECONDARY_COLOUR,
                  borderRadius: 15,
                  height: 110,
                }}>
                <View
                  style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginTop: 5.5,
                    marginBottom: 7,
                  }}>
                  <Text style={styles.goalText}>{goal.title}</Text>
                  <TouchableOpacity
                    onPress={() => this.toggleGoalCompleted(index)}>
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
                <View style={styles.description}>
                  <Text style={styles.descriptionText}>{goal.description}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    marginLeft: 15,
    marginRight: 10,
  },
  descriptionText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '500',
    width: '100%',
  },
});
