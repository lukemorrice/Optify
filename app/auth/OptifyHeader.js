import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {PRIMARY_COLOUR} from '../Style';

export default class OptifyHeader extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              width: 62,
              height: 62,
              backgroundColor: PRIMARY_COLOUR,
              borderRadius: 31,
              marginRight: 10,
            }}
          />
          <Text style={{fontSize: 62, color: PRIMARY_COLOUR, letterSpacing: 7}}>
            ptify
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  circle: {
    backgroundColor: '#48C9B0',
    borderRadius: 111,
    height: 222,
    width: 222,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 46,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
});
