import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Header extends Component {
  render() {
    return (
      <View>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Home</Text>
          <TouchableOpacity
            style={{marginRight: 10}}
            onPress={() => this.props.navigation.navigate('Settings')}>
            <Icon name="ios-cog" size={35}></Icon>
          </TouchableOpacity>
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
    fontSize: 34,
    fontWeight: '700',
    color: '#000000',
  },
});
