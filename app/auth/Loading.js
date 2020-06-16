import React, {Component} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {PRIMARY_COLOUR} from '../Style';

export default class Loading extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              width: 60,
              height: 60,
              backgroundColor: PRIMARY_COLOUR,
              borderRadius: 30,
              marginRight: 10,
            }}
          />
          <Text style={{fontSize: 60, color: PRIMARY_COLOUR, letterSpacing: 7}}>
            ptify
          </Text>
        </View>
        <ActivityIndicator
          size="large"
          color={PRIMARY_COLOUR}
          style={{marginTop: 60}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
