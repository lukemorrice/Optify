import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Header extends Component {
  render() {
    return (
      <View>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Home</Text>
          <View style={styles.icons}>
            <TouchableOpacity
              style={{marginRight: 20}}
              onPress={() => this.props.navigation.navigate('AddGoal')}>
              <Icon name="ios-add-circle-outline" size={35}></Icon>
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginRight: 10}}
              onPress={() => this.props.toggleVisible()}>
              <Icon name="ios-cog" size={35}></Icon>
            </TouchableOpacity>
          </View>
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
  icons: {
    flexDirection: 'row',
  },
});
