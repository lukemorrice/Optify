import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const options = {
  enableVibrateFallback: true,
};

export default class CategoryItem extends Component {
  state = {
    checked: true,
  };

  componentDidMount() {
    const categories = this.props.categories;
    const name = this.props.name;
    if (categories.includes(name)) {
      this.setState({checked: true});
    } else {
      this.setState({checked: false});
    }
  }

  toggleChecked = (name) => {
    ReactNativeHapticFeedback.trigger('impactMedium', options);
    this.setState({checked: !this.state.checked});
    this.props.updateCategory(name, !this.state.checked);
  };

  render() {
    return (
      <View style={styles.category}>
        <Text style={styles.categoryText}>{this.props.name}</Text>
        <TouchableOpacity onPress={() => this.toggleChecked(this.props.name)}>
          <Icon
            name={
              this.state.checked
                ? 'ios-checkmark-circle-outline'
                : 'ios-add-circle-outline'
            }
            size={28}
            color={this.state.checked ? '#48C9B0' : '#FF1744'}
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
    height: 28,
  },
  categoryText: {
    fontSize: 17,
    marginRight: 10,
  },
});
