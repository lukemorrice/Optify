import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Utils from './utils';

export default class Greeting extends Component {
  state = {
    greeting: '',
  };

  componentDidMount() {
    var utils = new Utils();
    var greeting = utils.getGreeting();
    this.setState({greeting});
  }

  render() {
    return (
      <View>
        <Text style={styles.greetingText}>
          {this.state.greeting}, {this.props.name}!
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  greetingText: {
    fontSize: 31,
    fontWeight: '400',
  },
});
