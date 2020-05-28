import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Utils from './Utils';

export default class Date extends Component {
  state = {
    day: '',
    date: '',
  };

  componentDidMount() {
    var utils = new Utils();
    var day = utils.getDay();
    var date = utils.getDate();
    this.setState({day, date});
  }

  render() {
    return (
      <View style={styles.date}>
        <Text style={styles.day}>{this.state.day}</Text>
        <Text style={styles.dateText}>{this.state.date}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  date: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  day: {
    fontSize: 23,
    fontWeight: '700',
    marginBottom: 3,
    color: '#000000',
  },
  dateText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#000000',
  },
});
