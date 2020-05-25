import React, {Component} from 'react';
import {View, Text} from 'react-native';
import GoalItems from './GoalItem';

export default class GoalSection extends Component {
  state = {
    goals: this.props.goals,
  };
  render() {
    return (
      <View>
        <GoalItems goals="1" />
        <GoalItems goals="1" />
      </View>
    );
  }
}
