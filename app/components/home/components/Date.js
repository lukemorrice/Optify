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
      <View>
        <Text style={styles.day}>
          {this.state.day} {this.state.date}
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
