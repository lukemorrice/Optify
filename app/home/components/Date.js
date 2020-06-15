import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Utils from './utils';

export default class Date extends Component {
  render() {
    var day = new Utils().getDay();
    var date = new Utils().getDate();
    return (
      <View>
        <Text style={styles.day}>
          {day} {date}
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
