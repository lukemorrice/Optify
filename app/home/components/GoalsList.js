import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {PRIMARY_COLOUR, SECONDARY_COLOUR} from '../../Style';
import Icon from 'react-native-vector-icons/Ionicons';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const options = {
  enableVibrateFallback: true,
};

export default class GoalsList extends Component {
  state = {
    refreshing: false,
  };

  toggleCompleted = (idx) => {
    ReactNativeHapticFeedback.trigger('impactMedium', options);
    if (this.props.showDescription[idx]) {
      this.props.toggleDescription(idx);
    }
    this.props.toggleGoalCompleted(idx);
  };

  wait(timeout) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  }

  refreshGoals = () => {
    this.setState({refreshing: true});
    this.wait(600)
      .then(() => this.props.refreshGoals())
      .then(() => this.setState({refreshing: false}));
  };

  renderGoals = (goal, index) => {
    if (!this.props.showDescription[index]) {
      return (
        <View
          style={[
            styles.container,
            {
              marginTop: index !== 0 ? 28 : 0,
              height: 50,
              backgroundColor: goal.completed
                ? PRIMARY_COLOUR
                : SECONDARY_COLOUR,
            },
          ]}>
          <TouchableOpacity onPress={() => this.props.toggleDescription(index)}>
            <View style={styles.content}>
              <View>
                <Text style={styles.goalText}>{goal.title}</Text>
              </View>
              <TouchableOpacity onPress={() => this.toggleCompleted(index)}>
                <Icon
                  name={
                    goal.completed
                      ? 'ios-checkmark-circle'
                      : 'ios-checkmark-circle-outline'
                  }
                  size={40}
                  style={{marginRight: 10}}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View
          style={[
            styles.container,
            {
              marginTop: index !== 0 ? 28 : 0,
              height: 110,
              backgroundColor: goal.completed
                ? PRIMARY_COLOUR
                : SECONDARY_COLOUR,
            },
          ]}>
          <TouchableOpacity onPress={() => this.props.toggleDescription(index)}>
            <View style={styles.content}>
              <View>
                <Text style={styles.goalText}>{goal.title}</Text>
              </View>
              <TouchableOpacity onPress={() => this.toggleCompleted(index)}>
                <Icon
                  name={
                    goal.completed
                      ? 'ios-checkmark-circle'
                      : 'ios-checkmark-circle-outline'
                  }
                  size={40}
                  style={{marginRight: 10}}
                  color="white"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.description}>
              <Text style={styles.descriptionText}>{goal.description}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  };

  render() {
    var goalsList = this.props.goalsList;
    return (
      <View style={{flex: 1, marginLeft: 15, marginRight: 15}}>
        <FlatList
          data={goalsList}
          renderItem={({item, index}) => this.renderGoals(item, index)}
          keyExtractor={(item) => item.title}
          scrollEnabled={true}
          style={{marginBottom: 5}}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this.refreshGoals()}
              tintColor="#808B96"
            />
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 15,
  },
  content: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goalText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 15,
  },
  description: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 10,
  },
  descriptionText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '500',
    width: '100%',
  },
});
