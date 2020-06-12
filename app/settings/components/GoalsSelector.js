import React, {Component} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const options = {
  enableVibrateFallback: true,
};

export default class GoalsSelector extends Component {
  onChangeGoals = (goal) => {
    ReactNativeHapticFeedback.trigger('impactMedium', options);
    this.props.updateGoals(goal);
  };

  render() {
    return (
      <View>
        <View style={styles.settingContainer}>
          <Text style={styles.settingText}>Daily number of goals</Text>
        </View>
        <View style={styles.options}>
          <TouchableOpacity
            style={[
              styles.optionContainer,
              this.props.goals == '1'
                ? {backgroundColor: '#48C9B0'}
                : {backgroundColor: 'white'},
            ]}
            onPress={() => this.onChangeGoals('1')}>
            <Text
              style={[
                styles.optionText,
                this.props.goals == '1'
                  ? {color: 'white', fontWeight: '600'}
                  : {color: 'black'},
              ]}>
              1
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.optionContainer,
              {borderRightWidth: 0.5, borderLeftWidth: 0.5},
              this.props.goals == '2'
                ? {backgroundColor: '#48C9B0'}
                : {backgroundColor: 'white'},
            ]}
            onPress={() => this.onChangeGoals('2')}>
            <Text
              style={[
                styles.optionText,
                this.props.goals == '2'
                  ? {color: 'white', fontWeight: '600'}
                  : {color: 'black'},
              ]}>
              2
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.optionContainer,
              this.props.goals == '3'
                ? {backgroundColor: '#48C9B0'}
                : {backgroundColor: 'white'},
            ]}
            onPress={() => this.onChangeGoals('3')}>
            <Text
              style={[
                styles.optionText,
                this.props.goals == '3'
                  ? {color: 'white', fontWeight: '600'}
                  : {color: 'black'},
              ]}>
              3
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  settingContainer: {
    marginLeft: 15,
    marginBottom: 12,
  },
  settingText: {
    fontSize: 20,
    fontWeight: '500',
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionContainer: {
    borderColor: 'gray',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '34%',
    height: 35,
  },
  optionText: {
    fontSize: 20,
  },
});
