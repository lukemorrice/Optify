import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class GoalHeader extends Component {
  render() {
    return (
      <View style={styles.goalHeading}>
        <View style={styles.goalDivider} />
        <Text style={styles.goalHeadingText}>
          Today's {this.props.goals > 1 ? 'goals' : 'goal'}
        </Text>
        <View style={styles.goalDivider} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  goalHeading: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  goalHeadingText: {
    fontSize: 26,
    fontWeight: '600',
    paddingHorizontal: 25,
  },
  goalDivider: {
    backgroundColor: 'black',
    height: 1,
    flex: 1,
    alignSelf: 'center',
  },
});
