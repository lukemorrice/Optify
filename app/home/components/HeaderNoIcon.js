import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class Header extends Component {
  render() {
    return (
      <View>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Home</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 36,
    fontWeight: '700',
    color: '#000000',
  },
});
