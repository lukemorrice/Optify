import React, {Component} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

export default class GoalsSelector extends Component {
  // state = {
  //   selectedGoal: '',
  // };

  onChangeGoals = (goal) => {
    this.props.updateGoals(goal);
  };

  // componentDidMount() {
  //   this.setState({selectedGoal: this.props.goals});
  //   // ss
  //   console.log(this.state.selectedGoal);
  // }

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
              {borderRightWidth: 0.5},
              this.props.goals == '1'
                ? {backgroundColor: '#48C9B0'}
                : {backgroundColor: 'white'},
            ]}
            onPress={() => this.onChangeGoals('1')}>
            <Text
              style={[
                styles.optionText,
                this.props.goals == '1' ? {color: 'white'} : {color: 'black'},
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
                this.props.goals == '2' ? {color: 'white'} : {color: 'black'},
              ]}>
              2
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.optionContainer,
              {borderLeftWidth: 0.5},
              this.props.goals == '3'
                ? {backgroundColor: '#48C9B0'}
                : {backgroundColor: 'white'},
            ]}
            onPress={() => this.onChangeGoals('3')}>
            <Text
              style={[
                styles.optionText,
                this.props.goals == '3' ? {color: 'white'} : {color: 'black'},
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
    marginBottom: 15,
  },
  settingText: {
    fontSize: 20,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionContainer: {
    borderColor: 'black',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '34%',
    height: 35,
  },
  optionText: {
    fontSize: 20,
  },
});
