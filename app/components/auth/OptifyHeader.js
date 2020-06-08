import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class OptifyHeader extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.circle}>
          <Text style={styles.header}>Optify</Text>
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
