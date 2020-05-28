import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Utils from './Utils';

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
        <View style={styles.greeting}>
          <Text style={styles.greetingText}>
            {this.state.greeting} {this.props.name}!
          </Text>
        </View>
        {/* <View style={styles.goalsIntro}>
          <Text style={styles.goalsIntroText}>
            Here {this.props.goals > 1 ? 'are' : 'is'} your {this.props.goals}{' '}
            {this.props.goals > 1 ? 'goals' : 'goal'} for today
          </Text>
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  greeting: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  goalsIntro: {},
  greetingText: {
    fontSize: 24,
    fontWeight: '500',
  },
});
