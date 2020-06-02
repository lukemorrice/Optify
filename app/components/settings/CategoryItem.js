import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const options = {
  enableVibrateFallback: true,
};

export default class CategoryItem extends Component {
  state = {
    checked: false,
  };

  toggleChecked = () => {
    ReactNativeHapticFeedback.trigger('impactMedium', options);
    this.setState({checked: !this.state.checked});
  };

  render() {
    return (
      <View style={styles.category}>
        <Text style={styles.categoryText}>{this.props.name}</Text>
        <TouchableOpacity onPress={() => this.toggleChecked()}>
          <Icon
            name={this.state.checked ? 'ios-checkbox' : 'ios-square-outline'}
            size={this.state.checked ? 21 : 25}
            color={this.state.checked ? '#48C9B0' : 'black'}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  category: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: 25,
  },
  categoryText: {
    fontSize: 17,
    marginRight: 10,
  },
});
