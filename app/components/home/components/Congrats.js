import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class CongratsMsg extends Component {
  state = {
    message: '',
    messages: ['Nice job', 'Great work', 'Well done', 'Keep it up', 'Awesome'],
  };

  componentDidMount() {
    let randomNum = this.generateRandomNumber(this.state.messages.length);
    let message = this.state.messages[randomNum];
    this.setState({message});
  }

  generateRandomNumber = (maximum) => {
    return Math.floor(Math.random() * maximum);
  };

  render() {
    return (
      <View style={styles.congrats}>
        <Text style={styles.congratsMsg}>
          {this.state.message}! All goals completed{' '}
        </Text>
        <View style={{backgroundColor: '#FFEB3B', borderRadius: 100}}>
          <Icon name="smile-beam" size={25} style={{borderRadius: 100}} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  congrats: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    marginTop: 25,
  },
  congratsMsg: {
    fontSize: 20,
  },
});
