import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Utils from './utils';

export default class Date extends Component {
  render() {
    const utils = new Utils();
    var day = utils.getDayOfWeek();
    var month = utils.getMonthAsString();
    var dateOfMonth = utils.getDateOfMonth();
    return (
      <View>
        <Text style={styles.day}>
          {day} {dateOfMonth} {month}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  day: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 3,
    color: '#000000',
  },
});
