import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {PRIMARY_COLOUR, SECONDARY_COLOUR} from '../design';
import Icon from 'react-native-vector-icons/Ionicons';

export default class AddGoal extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => this.props.navigation.goBack()}>
            <Icon name={'ios-arrow-round-back'} size={32} color="white" />
          </TouchableOpacity>
          <Text style={styles.header}>Add custom goal</Text>
        </View>
        <View style={styles.content}>
          <Text>Add goal screen</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOUR,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 70,
    marginLeft: 20,
    marginRight: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
  },
  content: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '84%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(21, 22, 48, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 60,
  },
});
