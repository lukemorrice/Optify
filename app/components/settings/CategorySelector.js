import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CategoryItem from './CategoryItem';

export default class CategorySelector extends Component {
  state = {
    exercise: false,
    wellbeing: false,
    creative: false,
    learning: true,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Types of goals</Text>
        <View style={styles.row}>
          <CategoryItem name="Exercise" />
          <CategoryItem name="Learning" />
          <CategoryItem name="Wellbeing" />
        </View>
        <View style={[styles.row, {borderTopWidth: 0, marginTop: 0}]}>
          <CategoryItem name="Creative" />
          <CategoryItem name="Relationships" />
          <CategoryItem name="Habits" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 40,
  },
  header: {
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 15,
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginTop: 10,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
  },
});
