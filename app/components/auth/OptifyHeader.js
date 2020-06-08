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
    borderRadius: 200,
    height: 220,
    width: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 44,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
});
